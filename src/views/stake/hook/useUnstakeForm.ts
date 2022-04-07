import { FixedPointNumber, forceToCurrencyId, MaybeCurrency } from "@acala-network/sdk-core";
import { EstimateRedeemResult } from "@acala-network/sdk/homa/types";
import { useCallback, useMemo, useState } from "react";
import { useActiveAccount, useApi, useExtrinsic } from "../../../connector";
import { useSubscription } from "../../../hooks/useSubscription";
import { useSwap } from "../../../sdk";
import { useHoma, useHomaConts } from "../../../sdk/hooks/homa";
import { useStakeBalance } from "./useStakeBalance"
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubmittableExtrinsic } from '@polkadot/api/types';
import { AccountId } from '@acala-network/types/interfaces';
import { ApiRx } from "@polkadot/api";
import { SwapParameters } from "@acala-network/sdk-swap/swap-parameters";
import { usePresetTokens } from "../../../connector/hooks/usePresetTokens";

export interface ExtrinsicData {
  account?: string | AccountId;
  section: string;
  method: string;
  params: any[] | null | undefined;
}
export type FeeData = {
  amount: FixedPointNumber;
  currency: MaybeCurrency;
  description: string;
};

interface RedeemResult {
  params: ExtrinsicData;
  receive: FixedPointNumber;
  fee: FixedPointNumber;
  call?: SubmittableExtrinsic<'rxjs'>;
  networkFee?: FeeData;
}

const DEFAULT_SWAP_SLIPPAGE = new FixedPointNumber(1 - 0.001);

function calculateRedeem(api: ApiRx, current: string, swapResult: SwapParameters, redeemResult: EstimateRedeemResult, fastRedeem: boolean): RedeemResult {
  // use normal redeem
  if (!redeemResult.canTryFastRedeem && !fastRedeem) {
    return {
      receive: redeemResult.receive,
      fee: redeemResult.fee,
      params: {
        method: 'requestRedeem',
        params: [
          redeemResult.request.toChainData(),
          false
        ],
        section: 'homa'
      }
    };
  }

  const receiveFromSwap = swapResult.output.balance.mul(DEFAULT_SWAP_SLIPPAGE);
  const receiveFromFastRedeem = redeemResult.receive;

  if (receiveFromSwap.gt(receiveFromFastRedeem) && !redeemResult.canTryFastRedeem) {
    const feeFromSwap = swapResult.input.balance.mul(redeemResult.env.exchangeRate)
      .minus(swapResult.output.balance).max(FixedPointNumber.ZERO);

    const params = swapResult.toChainData();

    params[2] = swapResult.output.balance.times(DEFAULT_SWAP_SLIPPAGE).toChainData();

    return {
      receive: receiveFromSwap,
      fee: feeFromSwap,
      params: {
        method: 'batchAll',
        section: 'utility',
        params: [[
          api.tx.dex.swapWithExactSupply(...params)
        ]]
      }
    };
  } else {
    return {
      receive: receiveFromFastRedeem,
      fee: redeemResult.fee,
      params: {
        method: 'batch',
        section: 'utility',
        params: [[
          api.tx.homa.requestRedeem(redeemResult.request.toChainData(), true),
          api.tx.homa.fastMatchRedeems([current])
        ]]
      }
    };
  }
}

export function useRedeemResult(amount: number, fastRedeem: boolean) {
  const { api } = useApi();
  const swap = useSwap();
  const homa = useHoma();
  const current = useActiveAccount();
  const { liquidToken, stakingToken } = homa.consts;
  const [result, setResult] = useState<RedeemResult>();
  const [call, feeData] = useExtrinsic(result?.params);

  useSubscription(() => {
    if (!swap?.swap || !homa || !api || !current || !amount) return;

    return combineLatest({
      swap: swap.swap([liquidToken, stakingToken], new FixedPointNumber(amount, liquidToken.decimals), 'EXACT_INPUT'),
      redeem: homa.subscribeEstimateRedeemResult(new FixedPointNumber(amount, liquidToken.decimals), fastRedeem),
    }).pipe(
      map(({ redeem, swap }) => {
        return calculateRedeem(api, current.address, swap, redeem, fastRedeem);
      })
    ).subscribe({
      next: setResult
    });
  }, [swap, homa, amount, fastRedeem]);

  const reset = useCallback(() => {
    setResult(undefined);
  }, [setResult]);

  return useMemo(() => [{
    ...result,
    call,
    networkFee: feeData
  }, reset] as const, [result, call, feeData, reset]);
}

export const useUnstakeForm = (token: 'KSM' | 'DOT') => {
  const { staked } = useStakeBalance(token);
  const network = useMemo(
    () => (token === "KSM" ? "karura" : "acala"),
    [token]
  );
  const presentTokens = usePresetTokens(network);
  const nativeToken = useMemo(() => presentTokens?.nativeToken, [presentTokens]);
  const homaConts = useHomaConts(network);
  const liquidToken = useMemo(() => homaConts.liquidToken, [homaConts]);
  const [isFast, setIsFast] = useState<boolean>(false);
  const [amount, _setAmount] = useState<string>();
  const redeem = useRedeemResult(Number(amount), isFast);

  const setAmount = useCallback(
    (val: string) => _setAmount(val),
    [_setAmount]
  );

  return [
    staked,
    liquidToken,
    isFast,
    amount,
    redeem,
    nativeToken,
    setIsFast,
    setAmount
  ] as const;
}