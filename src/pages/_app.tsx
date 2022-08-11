// TODO: need fix the type check
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import 'tailwindcss/tailwind.css';
import { Provider as ReduxProvider } from 'react-redux';
import dynamic from 'next/dynamic';
import { useCallback } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { InjectedAccount } from '@polkadot/extension-inject/types';
import { setSelectedAddress } from '@state/application/slice';
import { ConnectExtensionModal } from '../modals/ConnectExtension';
import { persistor, store, useAppDispatch, useAppSelector } from '../state';
import configs from '../config';
import { SelectActiveAccount } from '../modals/SelectActiveAccount';
import { NotificationProvider } from '../notification';
import { TxNotifications } from '../components/TxNotifications';
import '../styles/index.css';

const SubstrateConnector = dynamic(() => import('../connector/components/SubstrateConnector').then((i) => i.default), { ssr: false });

const connectorConfigs = Object.values(configs.apis);

const WithSubstrate = ({ Component, pageProps }) => {
  const defaultAddress = useAppSelector((state) => state.application.selectedAddress);
  const dispatch = useAppDispatch();

  const handleActiveSelected = useCallback(
    (account: InjectedAccount) => {
      setSelectedAddress(account.address);
      dispatch(setSelectedAddress(account.address));
    },
    [dispatch]
  );

  return (
    <SubstrateConnector
      appName={configs.appName}
      configs={connectorConfigs}
      defaultAddress={defaultAddress}
      onActiveSelected={handleActiveSelected}
    >
      <TxNotifications />
      <ConnectExtensionModal />
      <SelectActiveAccount />
      <Component {...pageProps} />
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
