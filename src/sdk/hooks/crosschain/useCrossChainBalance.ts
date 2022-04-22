import { FixedPointNumber } from '@acala-network/sdk-core';
import { RegisteredChain } from '@acala-network/sdk/cross-chain/configs/chains';
import { useActiveAccount } from '@connector';
import { useSubscription } from '@hooks/useSubscription';
import { useState } from 'react';
import { useCrossChain } from './useCrossChain';

export const useCrossChainBalance = (network: RegisteredChain, token: string) => {
  const crossChain = useCrossChain();
  const active = useActiveAccount();
  const [balance, setBalance] = useState<FixedPointNumber>();

  useSubscription(() => {
    if (!network || !active?.address) return;

    const adapter = crossChain.findAdapter(network);

    return adapter.subscribeAvailableBalance(token, active?.address).subscribe({ next: setBalance });
  }, [network, active?.address]);

  return balance;
};
