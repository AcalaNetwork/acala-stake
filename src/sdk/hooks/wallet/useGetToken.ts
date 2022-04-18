import { MaybeCurrency, Token } from '@acala-network/sdk-core';
import { SDKNetwork } from '@sdk/types';
import { useCallback } from 'react';
import { useWallet } from './useWallet';

export const useGetToken = (network: SDKNetwork) => {
  const wallet = useWallet(network);

  return useCallback(
    (token: MaybeCurrency): Token => {
      return wallet.__getToken(token);
    },
    [wallet]
  );
};
