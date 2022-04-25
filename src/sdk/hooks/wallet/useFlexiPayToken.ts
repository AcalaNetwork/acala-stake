import { useState } from 'react';
import { useActiveAccount, useApi } from '@connector';
import { SDKNetwork } from '../../types';
import { Token } from '@acala-network/sdk-core';
import { useSubscription } from '@hooks';
import { usePresetTokens, useWallet } from '..';

export const useFlexiPayToken = (network: SDKNetwork) => {
  const active = useActiveAccount();
  const wallet = useWallet(network);
  const presentTokens = usePresetTokens(network);
  const { api } = useApi(network);
  const [token, setToken] = useState<Token>();

  useSubscription(() => {
    if (!api || !api.query?.transactionPayment || !api.query?.transactionPayment?.alternativeFeeSwapPath || !wallet) return;

    return api.query.transactionPayment.alternativeFeeSwapPath(active.address).subscribe({
      next: (path) => {
        const token = (path as any).data?.unwrapOrDefault()[0];

        if (token) {
          return setToken(wallet.__getToken(token));
        }

        setToken(presentTokens?.nativeToken);
      }
    });
  }, [presentTokens, api, network, wallet]);

  return token;
};
