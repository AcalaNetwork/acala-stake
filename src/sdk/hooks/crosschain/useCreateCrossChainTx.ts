import { RegisteredChain } from '@acala-network/sdk/cross-chain/configs/chains';
import { CrossChainTransferParams } from '@acala-network/sdk/cross-chain/types';
import { SubmittableExtrinsic } from '@polkadot/api/types';
import { useCallback } from 'react';
import { useCrossChain } from './useCrossChain';

export const useCreateCrossChainTx = (network: RegisteredChain) => {
  const crossChain = useCrossChain();

  return useCallback((params: CrossChainTransferParams) => {
    const adapter = crossChain.findAdapter(network);

    if (!adapter) return;

    return adapter.createTx(params) as SubmittableExtrinsic<'rxjs'>;
  }, [crossChain, network]);
};
