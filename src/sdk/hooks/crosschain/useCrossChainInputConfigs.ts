import { RegisteredChain } from '@acala-network/sdk/cross-chain/configs/chains';
import { CrossChainInputConfigs, CrossChainTransferParams } from '@acala-network/sdk/cross-chain/types';
import { useActiveAccount } from '@connector';
import { useSubscription } from '@hooks/useSubscription';
import { useState } from 'react';
import { useCrossChain } from './useCrossChain';

export const useCrossChainInputConfigs = (network: RegisteredChain, params: Omit<CrossChainTransferParams, 'amount'>) => {
  const crossChain = useCrossChain();
  const active = useActiveAccount();
  const [balance, setBalance] = useState<CrossChainInputConfigs | undefined>();

  useSubscription(() => {
    if (!network) return;

    const adapter = crossChain.findAdapter(network);

    if (!adapter || !active.address || !params.to) return;

    return adapter.subscribeInputConfigs(params).subscribe({ next: setBalance });
  }, [network]);

  return balance;
};
