import { Token } from '@acala-network/sdk-core';
import { useState } from 'react';
import { BalanceData } from '@acala-network/sdk/wallet/type';
import { useWallet } from '.';
import { useSubscription } from '@hooks/useSubscription';
import { SDKNetwork } from '@sdk/types';

export const useBalance = (
  network: SDKNetwork,
  account: string,
  token: Token,
  type: keyof BalanceData = 'available'
) => {
  const [data, setData] = useState<BalanceData>();
  const wallet = useWallet(network);

  useSubscription(() => {
    if (!wallet) return;

    return wallet.subscribeBalance(token, account).subscribe({ next: setData });
  }, [wallet]);

  return data?.[type];
};
