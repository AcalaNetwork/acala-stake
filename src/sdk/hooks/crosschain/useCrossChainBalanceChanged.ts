import { RegisteredChain } from '@acala-network/sdk/cross-chain/configs/chains';
import { CrossChianBalanceChangedConfigs } from '@acala-network/sdk/cross-chain/types';
import { useCallback } from 'react';
import { useCrossChain } from './useCrossChain';

export const useCrossChainBalanceChanged = (network: RegisteredChain) => {
  const crossChain = useCrossChain();

  return useCallback((params: CrossChianBalanceChangedConfigs) => {
    const adapter = crossChain.findAdapter(network);

    if (!adapter) return;

    return adapter.subscribeBalanceChanged(params);
  }, [crossChain, network]);
};
