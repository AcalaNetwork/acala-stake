import { FixedPointNumber, Token } from '@acala-network/sdk-core';
import { EstimateMintResult } from '@acala-network/sdk/homa/types';
import { useSubscription } from '@hooks';
import { useHoma, useHomaEnv } from '@sdk/hooks/homa';
import { SDKNetwork } from '@sdk/types';
import { useEffect } from 'react';
import { useMemo, useState } from 'react';
import { ExtrinsicConfigs, useActiveAccount, useApi, useExtrinsic } from '../../../connector';
import { eliminateGap } from '../../../utils/eliminateGap';

interface Configs {
  network: SDKNetwork;
  amount: string;
  stakingToken: Token;
  liquidToken: Token;
  stakeImmediately: boolean
}

export const useStakeCall = ({ network, amount, liquidToken, stakingToken, stakeImmediately } : Configs) => {
  const homa = useHoma(network);
  const env = useHomaEnv(network);
  const api = useApi(network);
  const [estResult, setEstResutl] = useState<EstimateMintResult | undefined>();
  const params = useMemo((): ExtrinsicConfigs | undefined => {
    if (!api.api) return;

    if(stakeImmediately && !estResult) return;

    const fixedAmount = new FixedPointNumber(amount || 0,  stakingToken.decimals);

    if (!stakeImmediately) {
      return {
        network,
        section: 'homa',
        method: 'mint',
        params: [fixedAmount.toChainData()],
      };
    } 
    return {
      network,
      method: 'batchAll',
      params: [[
        api.api.tx.homa.mint(fixedAmount.toChainData()),
        api.api.tx.honzon.adjustLoan(
          liquidToken.toChainData(),
          (estResult?.receive.toChainData() || '0').replace(/\d{6}$/, '000000'),
          '0'
        )
      ]],
      section: 'utility'
    };
  }, [amount, api.api, estResult, liquidToken, network, stakeImmediately, stakingToken.decimals]);

  const callData = useExtrinsic(params);

  useSubscription(() => {
    if(!homa || !amount) return;

    const fixedAmount = new FixedPointNumber(amount, stakingToken.decimals);

    return homa.subscribeEstimateMintResult(fixedAmount).subscribe({
      next: setEstResutl,
      error: () => {
        // ignore error
      }
    });
  }, [homa, amount]);

  return useMemo(() => ({
    env,
    estResult,
    callData
  }), [callData, env, estResult]);
};

export type StakeCallData = ReturnType<typeof useStakeCall>;