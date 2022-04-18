// TODO: need fix the type check
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import 'tailwindcss/tailwind.css';
import { Provider as ReduxProvider } from 'react-redux';
import dynamic from 'next/dynamic';
import { ConnectExtensionModal } from '../modals/ConnectExtension';
import { InjectedAccount } from '@polkadot/extension-inject/types';
import { persistor, store, useSelectedAddress, useSetSelectedAddress } from '../state';
import configs from '../config';
import { SDKProvider } from '../sdk';
import '../styles/index.css';
import { SelectActiveAccount } from '../modals/SelectActiveAccount';
import { NotificationProvider } from '../notification';
import { TxNotifications } from '../components/TxNotifications';
import { useCallback } from 'react';
import { PersistGate } from 'redux-persist/integration/react';

const SubstrateConnector = dynamic(() => import('../connector/components/SubstrateConnector').then((i) => i.default), { ssr: false });

const connectorConfigs = Object.values(configs.apis);

const WithSDK = ({ Component, pageProps }) => {
  return (
    <SDKProvider>
      <ConnectExtensionModal />
      <SelectActiveAccount />
      <Component {...pageProps} />
    </SDKProvider>
  );
};

const WithSubstrate = (props) => {
  const defaultAddress = useSelectedAddress();
  const setSelectedAddress = useSetSelectedAddress();

  const handleActiveSelected = useCallback(
    (account: InjectedAccount) => {
      setSelectedAddress(account.address);
    },
    [setSelectedAddress]
  );

  return (
    <SubstrateConnector
      appName={configs.appName}
      configs={connectorConfigs}
      defaultAddress={defaultAddress}
      onActiveSelected={handleActiveSelected}
    >
      <TxNotifications />
      <WithSDK {...props} />
      <TxNotifications />
    </SubstrateConnector>
  );
};

function MyApp(props) {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor} />
      <NotificationProvider>
        <WithSubstrate {...props} />
      </NotificationProvider>
    </ReduxProvider>
  );
}

export default MyApp;
