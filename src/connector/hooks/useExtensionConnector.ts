import { useCallback, useEffect, useRef, useState } from 'react';
import { ConnectStatus, ExtensionConnectorData } from '../types';
import { InjectedExtension, InjectedAccount, Unsubcall } from '@polkadot/extension-inject/types';
import { useMemo } from 'react';
import { NoExtensions } from '../errors';

export async function getExtensions(appName: string): Promise<InjectedExtension> {
// @polkadot/extension-dapp doesn't support SSR

  const extensions = await (await import('@polkadot/extension-dapp').then((data) => data.web3Enable))(appName);

  if (extensions.length === 0) throw new NoExtensions();

  // FIXME: just select the first extension, if browser has multiply extensions, this may cause an error.
  const currentExtensions = extensions.find(i => i.name === 'polkadot-js');

  return currentExtensions;
}

interface UseExtensionConnectorConfigs {
  appName: string;
  defaultAddress?: string;
  onActiveSelected?: (value: InjectedAccount) => void;
}

export const useExtensionConnector = ({
  appName,
  defaultAddress,
  onActiveSelected,
}: UseExtensionConnectorConfigs): ExtensionConnectorData => {
  const [extension, setExtension] = useState<InjectedExtension | undefined>();
  const [status, setStatus] = useState<ExtensionConnectorData['status']>(ConnectStatus.disconnected);
  const [injectedAccounts, setInjectedAccounts] = useState<InjectedAccount[]>([]);
  const [active, setActiveData] = useState<InjectedAccount>();
  const subscriber = useRef<Unsubcall>();

  const connect = useCallback( async () => {
    // clear accounts subscriber
    if (subscriber.current) subscriber.current?.();

    // if extension is not connect, connect extension first
    if (status !== ConnectStatus.ready) {
      try {
        setStatus(ConnectStatus.connecting);

        const extension = await getExtensions(appName);

        setExtension(extension);
        setStatus(ConnectStatus.connected);

        subscriber.current = extension.accounts.subscribe(setInjectedAccounts);
      } catch (e) {
        setStatus(ConnectStatus.failed);
        console.error(e);
        throw e;
      }
    }
  },
  [status, appName]
  );

  const handleSetActive = useMemo(
    () => async (account: InjectedAccount) => {
      setActiveData(account);
      setStatus(ConnectStatus.ready);

      if (onActiveSelected) {
        onActiveSelected(account);
      }
    },
    [setActiveData, setStatus, onActiveSelected]
  );

  // auto select default account
  useEffect(() => {
    // do nothing if active is already selected
    if (active) return;

    // do nothing if injected accounts is not ready
    if (!injectedAccounts.length) return;

    let account;

    if (defaultAddress) {
      account = injectedAccounts.find((item) => item.address === defaultAddress);
    } else {
      account = injectedAccounts[0];
    }

    if (!account) return;

    handleSetActive(account);
  }, [defaultAddress, active, handleSetActive, injectedAccounts]);

  // auto connect
  useEffect(() => {
    connect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useMemo(
    () => ({
      extension,
      status,
      connect,
      injectedAccounts,
      active,
      setActive: handleSetActive,
    }),
    [extension, status, connect, active, handleSetActive, injectedAccounts]
  );
};
