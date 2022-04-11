import { useEffect, useState } from 'react';
import { usePresetTokens } from '../../../connector/hooks/usePresetTokens';
import { useActiveAccount, useApi } from '../../../connector';
import { SDKNetwork } from '../../types';
import { Token } from '@acala-network/sdk-core';
import { useSubscription } from '../../../hooks/useSubscription';

export const useFlexiPayToken = (network: SDKNetwork) => {
  const active = useActiveAccount();
  const presentTokens = usePresetTokens(network);
  const { api } = useApi(network);
  const [token, setToken] = useState<Token>();

  // useSubscription(() => {
  //   if (!api || !api.query?.transactionPayment || !api.query?.transactionPayment?.alternativeFeeSwapPath) return;

  //   return api.query.transactionPayment.alternativeFeeSwapPath(active.address).subscribe({
  //     next: (path) => {
  //       const token = (path as any).data?.unwrapOrDefault()[0];

  //       if (token) {
  //         return setToken(token);
  //       }

  //       setToken(presentTokens?.nativeToken);
  //     }
  //   });
  // }, [presentTokens, api, network]);

  return token;
};
