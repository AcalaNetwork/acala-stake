import { Token } from '@acala-network/sdk-core';
import { useApi } from '@connector';
import { useWallet } from '@sdk';
import { SDKNetwork } from '@sdk/types';
import { useState } from 'react';
import { useSubscription } from './useSubscription';

export const useFeeSwapPaths = (network: SDKNetwork) => {
  const { api } = useApi(network);
  const wallet = useWallet(network);
  const [feePaths, setFeePaths] = useState<Token[][]>([]);

  useSubscription(() => {
    if (!api || !wallet) return;

    return api.query.transactionPayment.globalFeeSwapPath?.entries().subscribe({
      next: (data) => {
        const paths = data.map((item) => {
          return (item[1] as any).unwrapOrDefault() as any[];
        });

        const convertedPaths = paths.map((item) => item.map((token) => wallet.__getToken(token)));

        setFeePaths([...convertedPaths]);
      }
    });
  }, [api?.query?.transactionPayment?.globalFeeSwapPath, wallet]);

  return feePaths;
};
