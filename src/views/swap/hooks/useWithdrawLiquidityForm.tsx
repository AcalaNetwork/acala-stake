import {
  FixedPointNumber as FN,
  Token,
  TokenType,
} from "@acala-network/sdk-core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BalanceCurrencyInputProps } from "../../../components/form";
import { useActiveAccount, useApi, useExtrinsic } from "../../../connector";
import { useInput } from "../../../hooks/useInput";
import { useSubscription } from "../../../hooks/useSubscription";
import { useSuggestInput, useTokens } from "../../../sdk";
import { useLiquidity } from "../../../sdk/hooks/liquidity";

export const useWithdrawLiquidityForm = () => {
  const { api } = useApi();
  const account = useActiveAccount();
  const liquidity = useLiquidity();
  const enabledCurrencies = useTokens(TokenType.DEX_SHARE);
  const [tokenList, setTokenList] = useState<Token[]>([]);
  const [selectToken, setSelectToken] = useState<Token>();
  const [slippage, setSlippage] = useState<number>(0.005);
  const [params, setParams] = useState<any[]>([]);
  const [amounts, setAmounts] = useState<FN[]>([new FN(1), new FN(1)]);
  const [err, setErr] = useState<string>("");
  const [slelectValue, { onChange: onSlelectChange, ref: slelectRef }] =
    useInput<BalanceCurrencyInputProps["value"]>({
      init: { amount: "", token: undefined },
    });

  const [token1, token2] = useMemo(
    () => (!selectToken ? [] : selectToken.pair),
    [selectToken]
  );

  useEffect(() => {
    if (!enabledCurrencies) return;
    setTokenList(enabledCurrencies);
  }, [enabledCurrencies]);

  useEffect(() => {
    onSlelectChange({
      amount: "",
      token: selectToken,
    });
  }, [onSlelectChange, selectToken]);

  const onSlelectAmountChange = useCallback((amount: string) => {
    onSlelectChange({
      amount: amount,
      token: selectToken,
    });
  }, [selectToken, onSlelectChange])

  const [mockCall] = useExtrinsic({
    method: "removeLiquidity",
    params: [0, 0, 0, 0, 0, 0],
    section: "dex",
  });

  const suggestTokenMax = useSuggestInput(
    account?.address,
    selectToken,
    true,
    mockCall
  );

  const onMax = useCallback(() => {
    onSlelectChange({
      amount: suggestTokenMax.toString(),
      token: slelectRef.current.token,
    });
  }, [onSlelectChange, suggestTokenMax, slelectRef]);

  useEffect(() => {
    if (Number(slelectValue.amount) > suggestTokenMax?.toNumber()) {
      setErr("Insufficient KSM transferable balance");
    } else {
      setErr("");
    }
  }, [slelectValue, suggestTokenMax]);

  useSubscription(() => {
    if (!liquidity || !selectToken) return;

    return liquidity.subscribePoolDetails(selectToken).subscribe({
      next: (data) => {
        const { amounts } = data;
        setAmounts(amounts);
      },
    });
  }, [liquidity, selectToken]);

  useSubscription(() => {
    if (!liquidity || !selectToken) return;

    return liquidity
      .subscribeEstimateRemoveLiquidityResult(
        selectToken,
        new FN(slelectValue?.amount),
        slippage
      )
      .subscribe({
        next: (data) => {
          const params = [
            token1?.toCurrencyId(api),
            token2?.toCurrencyId(api),
            data.removeShare.toChainData(),
            data.minReceived[0].toChainData(),
            data.minReceived[1].toChainData(),
            false,
          ];
          setParams(params);
        },
      });
  }, [slelectValue, selectToken, slippage]);

  const message = useMemo(
    () => `Withdraw liquidity ${token1?.name} and ${token2?.name}`,
    [token1, token2]
  );

  return [
    selectToken,
    tokenList,
    slelectValue,
    suggestTokenMax,
    amounts,
    slippage,
    params,
    message,
    err,
    setSelectToken,
    onSlelectAmountChange,
    onMax,
    setSlippage,
  ] as const;
};
