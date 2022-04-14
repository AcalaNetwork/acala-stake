import { ApiRx, WsProvider } from "@polkadot/api";
import { options } from "@acala-network/api";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { isEmpty, remove } from "lodash";
import {
  ConnectStatus,
  SubstrateConnectorConfig,
  SubstrateConnectorData,
} from "../types";
import { tap } from "rxjs/operators";
import { useMemo } from "react";

const notEmpty = (i: unknown) => !isEmpty(i);

// put first endpoint to the forefront
const sortEndpointsByPriority = (
  all: Record<string, string>,
  first?: string
) => {
  return [first, ...remove(Object.values(all), first)].filter(notEmpty);
};

const createIsConnectedGuard = () => {
  let onSuccess;
  let onFailed;

  const guard = new Promise((resolve, reject) => {
    onSuccess = resolve;
    onFailed = reject;
  });

  return [guard, onSuccess, onFailed];
};

export const useApiConnector = ({
  network,
  endpoints,
  first,
}: SubstrateConnectorConfig): SubstrateConnectorData => {
  const isConnected = useRef(createIsConnectedGuard());
  const [api, setApi] = useState<ApiRx | null>();
  const [status, setStatus] = useState<ConnectStatus>(
    ConnectStatus.disconnected
  );
  const endpointList = useMemo(
    () => sortEndpointsByPriority(endpoints, first),
    [endpoints, first]
  );

  useEffect(() => {
    // we should ensure that the useEffect will only run once
    if (api) return;

    const provider = new WsProvider(endpointList);
    const apiOptions = network === 'acala' || network === 'karura' ? options({ provider}) : { provider };

    const subscriber = ApiRx.create(apiOptions)
      .pipe(tap(() => setStatus(ConnectStatus.connecting)))
      .subscribe({
        error: () => {
          setStatus(ConnectStatus.failed);
        },
        next: (api) => {
          // connect success
          setApi(api);
          setStatus(ConnectStatus.connected);
          isConnected.current[1]();
        },
      });

    return () => subscriber.unsubscribe();
  }, [api, endpointList, network]);

  return useMemo(
    () => ({
      api,
      status,
      network,
      isConnected: isConnected.current[0]
    }),
    [api, status, network, isConnected]
  );
};
