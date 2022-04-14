import { Token } from '@acala-network/sdk-core';
import { useCrossChainSDKConnector } from '@sdk/hooks/crosschain/useCrossChainSDKConnector';
import React, { FC, useMemo } from 'react';
import { useApi } from '../../connector';
import { useSubscription } from '../../hooks/useSubscription';
import { useSDKConnector } from '../hooks/useSDKConnector';
import { SDKStore } from '../types';

export const SDKContext = React.createContext<SDKStore>({} as any);

let ACALA_TOKEN_LISTS: Record<string, Token> = {};
let KARURA_TOKEN_LISTS: Record<string, Token> = {};

export const SDKProvider: FC = React.memo(({ children }) => {
  const acalaApi = useApi('acala');
  const polkadotApi = useApi('polkadot');
  const karuraApi = useApi('karura');
  const kusamaApi = useApi('kusama');
  const acalaSDK = useSDKConnector(acalaApi.api);
  const karuraSDK = useSDKConnector(karuraApi.api);
  const crossChainSDK = useCrossChainSDKConnector({
    acalaApi: acalaApi.api,
    karuraApi: karuraApi.api,
    kusamaApi: kusamaApi.api,
    polkadotApi: polkadotApi.api,
    acalaWallet: acalaSDK.wallet,
    karuraWallet: karuraSDK.wallet
  });

  const { wallet: acalaWallet } = acalaSDK;
  const { wallet: karuraWallet } = karuraSDK;

  useSubscription(() => {
    if (!acalaWallet) return;

    // export token list form wallet sdk
    return acalaWallet.subscribeTokens().subscribe({
      next: value => ACALA_TOKEN_LISTS = value
    });
  }, [acalaWallet]);

  useSubscription(() => {
    if (!karuraWallet) return;

    // export token list form wallet sdk
    return karuraWallet.subscribeTokens().subscribe({
      next: value => KARURA_TOKEN_LISTS = value
    });
  }, [karuraWallet]);

  const value = useMemo(() => {
    return { acala: acalaSDK, karura: karuraSDK, crossChain: crossChainSDK };
  }, [acalaSDK, karuraSDK, crossChainSDK]);

  return (
    <SDKContext.Provider value={value}>
      {children}
    </SDKContext.Provider>
  );
});

export const SDKConsumer = SDKContext.Consumer;

export { ACALA_TOKEN_LISTS, KARURA_TOKEN_LISTS };