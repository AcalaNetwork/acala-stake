import { FixedPointNumber } from '@acala-network/sdk-core';
import { SwapParameters } from '@acala-network/sdk-swap/swap-parameters';
import { EstimateRedeemResult } from '@acala-network/sdk/homa/types';
import { useActiveAccount, useApi, useExtrinsic, CallInfo, ExtrinsicConfigs } from '@connector';
import { TokenAmount } from '@connector/types';
import { useSubscription } from '@hooks/useSubscription';
import { ApiRx } from '@polkadot/api';
import { useSwap } from '@sdk';
import { useHoma } from '@sdk/hooks/homa';
import { SDKNetwork } from '@sdk/types';
import { useCallback, useMemo, useState } from 'react';
import { combineLatest, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface Configs {
  network: SDKNetwork;
  amount: string;
  isFastRedeem: boolean;
}

interface RedeemParams {
  params: ExtrinsicConfigs;
  receive: FixedPointNumber;
  unstakeFee: FixedPointNumber;
}

interface RedeemCallParams extends CallInfo {
  receive: FixedPointNumber;
  unstakeFee: TokenAmount;
  reset: () => void;
}

const DEFAULT_SWAP_SLIPPAGE = new FixedPointNumber(1 - 0.001);

function calculateRedeem(
  network: SDKNetwork,
  api: ApiRx,
  current: string,
  swapResult: SwapParameters,
  redeemResult: EstimateRedeemResult,
  fastRedeem: boolean
): RedeemParams {
  // use normal redeem
  if (!redeemResult.canTryFastRedeem && !fastRedeem) {
    return {
      receive: redeemResult.receive,
      unstakeFee: redeemResult.fee,
      params: {
        network,
        method: 'requestRedeem',
        params: [redeemResult.request.toChainData(), false],
        section: 'homa',
      },
    };
  }

  const receiveFromSwap = swapResult?.output.balance.mul(DEFAULT_SWAP_SLIPPAGE) || FixedPointNumber.ZERO;
  const receiveFromFastRedeem = redeemResult.receive;

  if (receiveFromSwap.gt(receiveFromFastRedeem)) {
    const feeFromSwap = swapResult.input.balance
      .mul(redeemResult.env.exchangeRate)
      .minus(swapResult.output.balance)
      .max(FixedPointNumber.ZERO);

    const params = swapResult.toChainData();

    params[2] = swapResult.output.balance.times(DEFAULT_SWAP_SLIPPAGE).toChainData();

    return {
      receive: receiveFromSwap,
      unstakeFee: feeFromSwap,
      params: {
        network,
        method: 'batchAll',
        section: 'utility',
        params: [[api.tx.dex.swapWithExactSupply(...params)]],
      },
    };
  }
  return {
    receive: receiveFromFastRedeem,
    unstakeFee: redeemResult.fee,
    params: {
      network,
      method: 'batchAll',
      section: 'utility',
      params: [
        [api.tx.homa.requestRedeem(redeemResult.request.toChainData(), true), api.tx.homa.fastMatchRedeemsCompletely([current])],
      ],
    },
  };
}

export const useUnstakeCall = ({ network, amount, isFastRedeem }: Configs): RedeemCallParams => {
  const { api } = useApi(network);
  const swap = useSwap(network);
  const homa = useHoma(network);
  const current = useActiveAccount();
  const { liquidToken, stakingToken } = homa.consts;
  const [result, setResult] = useState<RedeemParams>();
  const callInfo = useExtrinsic({ ...result?.params, network });

  useSubscription(() => {
    if (!swap?.swap || !homa || !api || !current || !amount) return;

    const fixedAmount = new FixedPointNumber(amount, liquidToken.decimals);

    return combineLatest({
      swap: swap.swap([liquidToken, stakingToken], fixedAmount, 'EXACT_INPUT').pipe(catchError(() => of(undefined))),
      redeem: homa.subscribeEstimateRedeemResult(fixedAmount, isFastRedeem),
    })
      .pipe(map(({ redeem, swap }) => calculateRedeem(network, api, current.address, swap, redeem, isFastRedeem)))
      .subscribe({
        next: setResult,
      });
  }, [swap, homa, amount, isFastRedeem]);

  const reset = useCallback(() => {
    setResult(undefined);
  }, [setResult]);

  return useMemo(
    () => ({
      ...callInfo,
      receive: result?.receive,
      unstakeFee: {
        token: liquidToken,
        amount: result?.unstakeFee,
      },
      reset,
    }),
    [callInfo, result?.receive, result?.unstakeFee, liquidToken, reset]
  );
};
