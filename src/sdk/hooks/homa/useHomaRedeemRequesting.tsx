import { RedeemRequest } from '@acala-network/sdk/homa/types';
import { useState } from 'react';
import { useHoma } from '.';
import { useSubscription } from '../../../hooks/useSubscription';
import { SDKNetwork } from '../../types';

export const useHomaRedeemRequesting = (network: SDKNetwork, address: string) => {
  const homa = useHoma(network);
  const [data, setData] = useState<RedeemRequest | undefined>();

  useSubscription(() => {
    if (!homa) return;

    return homa.subscribeUserRedeemRequest(address).subscribe({ next: setData });
  }, [homa]);

  return data;
};
