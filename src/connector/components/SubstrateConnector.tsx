import { isFunction, merge, uniqueId } from "lodash";
import React, {
  createContext,
  FC,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { InjectedAccount } from "@polkadot/extension-inject/types";
import { useApiConnector } from "../hooks/useApiConnector";
import {
  ConnectStatus,
  SubstrateConnectorData,
  SubstrateConnectorConfig,
  ExtensionConnectorData,
  SubmitData,
} from "../types";
import config, { CONNECTED_NETWORK } from "../../config";
import { useExtensionConnector } from "../hooks/useExtensionConnector";
import { SubmitHandler } from "./SubmitHandler";

type ConnectContextData = {
	apis: Record<CONNECTED_NETWORK, SubstrateConnectorData>;
	extension: ExtensionConnectorData;
	callQueue: SubmitData[];
	sendTx?: (data: Omit<SubmitData, "trackId">) => string; // send tx
	updateTx?: (data: Partial<SubmitData>) => void; // update tx status
	removeTx?: (data: string) => void; // remove tx
};

type ConnectorConfigs = SubstrateConnectorConfig[];

type SubstrateConnectorProps = PropsWithChildren<{
	appName: string;
	configs: ConnectorConfigs;
	children: ReactNode | ((data: ConnectContextData) => ReactNode);
	defaultAddress: string; // default address
	onActiveSelected: (value: InjectedAccount) => void; // callback if selected active account
}>;

// create the init pre data from config
const INIT_APIS_DATA = {
  apis: Object.fromEntries(
    Object.entries(config.apis).map(([key, data]) => {
      return [
        key,
        {
          network: key,
          api: null,
          status: ConnectStatus.disconnected,
        },
      ];
    })
  ),
  extension: {
    extension: null,
    status: ConnectStatus.disconnected,
    connect: undefined, // EMPTY ACTION
  },
  callQueue: [],
} as ConnectContextData;

export const ConnectorContext =
	createContext<ConnectContextData>(INIT_APIS_DATA);

interface SubConnectorProps {
	config: SubstrateConnectorConfig;
	onChange: (data: SubstrateConnectorData) => void;
}

const SubConnector: FC<SubConnectorProps> = ({ config, onChange }) => {
  const connector = useApiConnector(config);

  useEffect(() => {
    // upload connector data to context
    if (!onChange) return;

    onChange(connector);
  }, [connector, onChange]);
  return null;
};

type Actions =
	| { key: "update-connector-data"; data: SubstrateConnectorData }
	| { key: "update-extension-data"; data: ExtensionConnectorData }
	| { key: "insert-tx-queue"; data: SubmitData }
	| { key: "update-tx-queue"; data: Partial<SubmitData> }
	| { key: "remove-tx-queue"; data: string };

const reducer = (
  state: ConnectContextData,
  action: Actions
): ConnectContextData => {
  switch (action.key) {
  case "update-connector-data": {
    return {
      ...state,
      apis: {
        ...state.apis,
        [action.data.network]: action.data,
      },
    };
  }
  case "update-extension-data": {
    return {
      ...state,
      extension: action.data,
    };
  }
  case "insert-tx-queue": {
    const queue = state.callQueue;

    return { ...state, callQueue: [...queue, action.data] };
  }
  case "update-tx-queue": {
    const queue = state.callQueue;
    const maybeData = state.callQueue.find(
      (item) => item.trackId === action.data.trackId
    );

    if (maybeData) {
      // handle tx update
      merge(maybeData, action.data);

      return { ...state, callQueue: [...queue] };
    }

    // do nothing if doesn't exists
    return state;
  }
  case "remove-tx-queue": {
    const queue = state.callQueue;

    const index = queue.findIndex((i) => i.trackId === action.data);

    if (index !== -1) {
      queue.splice(index, 1);

      return { ...state, callQueue: [...queue] };
    }

    // do nothing if doesn't exists
    return state;
  }
  default: {
    return state;
  }
  }
};

const count = 0;

/**
 *
 * Usage:
 * <SubstrateConnector endpoints={endpoints}>
 * {
 *    ({ api, network, status }) => {
 *        <Content api={api} status={status} />
 *    }
 * }
 * </SubstrateConnector>
 */
const SubstrateConnector: FC<SubstrateConnectorProps> = ({
  appName,
  children,
  configs,
  defaultAddress,
  onActiveSelected,
}) => {
  const [state, dispatch] = useReducer(reducer, INIT_APIS_DATA);
  const extensionConnector = useExtensionConnector({
    appName,
    defaultAddress,
    onActiveSelected,
  });

  const isFunc = isFunction(children);

  const onChange = useCallback(
    (data: SubstrateConnectorData) => {
      dispatch({ key: "update-connector-data", data });
    },
    [dispatch]
  );

  const sendTx = useCallback(
    (data: Omit<SubmitData, "trackId">) => {
      const trackId = uniqueId("tx-queue-");

      dispatch({ key: "insert-tx-queue", data: { ...data, trackId } });

      return trackId;
    },
    [dispatch]
  );

  const updateTx = useCallback(
    (data: Partial<SubmitData>) => {
      dispatch({ key: "update-tx-queue", data });
    },
    [dispatch]
  );

  const removeTx = useCallback(
    (id: string) => {
      dispatch({ key: "remove-tx-queue", data: id });
    },
    [dispatch]
  );

  // update extension data
  useEffect(
    () => dispatch({ key: "update-extension-data", data: extensionConnector }),
    [dispatch, extensionConnector]
  );

  // auto set api signer
  const autoSetSigner = useMemo(
    () => async () => {
      const { active, status } = extensionConnector;

      // do nothing if no active address
      if (!active?.address) return;

      // do nothing if not connect to extension
      if (
        [
          ConnectStatus.disconnected,
          ConnectStatus.failed,
          ConnectStatus.connecting,
        ].find((i) => i === status)
      )
        return;
			
      // do nothing if apis aren't connected
      if (Object.values(state.apis).filter((item) => item.status !== ConnectStatus.connected).length > 0) return;

      const [web3FromAddress, web3Enable] = await import(
        "@polkadot/extension-dapp"
      ).then((data) => [data.web3FromAddress, data.web3Enable] as const);

      for (const api of Object.values(state.apis)) {
        if (!api.api) continue;

        // force ensuer web3Enable is called
        await web3Enable(appName);

        const injector = await web3FromAddress(active.address);

        api.api?.setSigner(injector.signer);
      }
    },
    [extensionConnector, state.apis, appName]
  );

  useEffect(() => {
    autoSetSigner();
  }, [autoSetSigner]);

  const data = useMemo(
    () => ({
      ...state,
      sendTx,
      updateTx,
      removeTx,
    }),
    [state, sendTx, updateTx, removeTx]
  );
  return (
    <ConnectorContext.Provider value={data}>
      {configs &&
				configs.map((subConfig) => (
				  <SubConnector
				    config={subConfig}
				    key={subConfig.network}
				    onChange={onChange}
				  />
				))}
      <SubmitHandler />
      {isFunc ? children(state) : children}
    </ConnectorContext.Provider>
  );
};

export const SubstrateConnectorConsumer = ConnectorContext.Consumer;

export default SubstrateConnector;
