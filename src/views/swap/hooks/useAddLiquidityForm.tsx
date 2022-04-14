import {
  FixedPointNumber as FN,
  Token,
  TokenType,
} from "@acala-network/sdk-core";
import { useCallback, useMemo } from "react";
import { useEffect, useState } from "react";
import { BalanceCurrencyInputProps } from "../../../components/form";
import { RadioOption } from "../../../components/form/RadioGroup";
import { useActiveAccount, useApi, useExtrinsic } from "../../../connector";
import { useInput } from "../../../hooks/useInput";
import { useSubscription } from "../../../hooks/useSubscription";
import { useSuggestInput, useTokens } from "../../../sdk";
import { useLiquidity } from "../../../sdk/hooks/liquidity";
import { useOpenModal } from "../../../state";
import { ModalType } from "../../../state/application/types";
import { getTokenName } from "../../../utils/token";

export enum LIQUIDITY_MODE {
  MODE_TOKEN1,
  MODE_TOKEN2,
  MODE_BOTH,
}

export const useAddLiquidityForm = () => {
  const { api } = useApi();
  const account = useActiveAccount();
  const liquidity = useLiquidity();
  const enabledCurrencies = useTokens(TokenType.DEX_SHARE);
  const openConfirmModel = useOpenModal(ModalType.addLiquidityConfirm);
  const [incrementShare, setIncrementShare] = useState<FN>(new FN(0));
  const [incrementShareWithSlippage, setIncrementShareWithSlippage] =
    useState<FN>(new FN(0));
  const [totalShare, setTotalShare] = useState<FN>(new FN(0));
  const [slippage, setSlippage] = useState<number>(0.005);
  const [tokenList, setTokenList] = useState<Token[]>([]);
  const [liquidityMode, setMode] = useState<LIQUIDITY_MODE>(
    LIQUIDITY_MODE.MODE_BOTH
  );
  const [selected, setSelected] = useState<Token>();
  const [token1, token2] = useMemo(
    () => (!selected ? [] : selected.pair),
    [selected]
  );
  const [autoStake, setAutoStake] = useState<boolean>(false);
  const [token1Value, { onChange: onToken1Change, ref: token1Ref }] = useInput<
    BalanceCurrencyInputProps["value"]
  >({
    init: { amount: "", token: undefined },
  });
  const [token2Value, { onChange: onToken2Change, ref: token2Ref }] = useInput<
    BalanceCurrencyInputProps["value"]
  >({
    init: { amount: "", token: undefined },
  });
  const [amounts, setAmounts] = useState<FN[]>([new FN(1), new FN(1)]);
  const [err, setErr] = useState<string>("");
  const exchangeRate = useMemo(() => amounts[1].div(amounts[0]), [amounts]);

  const handleAddLiquidityClick = useCallback(() => {
    openConfirmModel();
  }, [openConfirmModel]);

  useEffect(() => {
    if (!enabledCurrencies) return;
    setTokenList(enabledCurrencies);
  }, [enabledCurrencies]);

  useEffect(() => {
    if (liquidityMode != LIQUIDITY_MODE.MODE_TOKEN2) {
      onToken1Change({
        amount: "",
        token: token1,
      });
    }
    if (liquidityMode != LIQUIDITY_MODE.MODE_TOKEN1) {
      onToken2Change({
        amount: "",
        token: token2,
      });
    }
  }, [liquidityMode, selected]);

  const [mockCall] = useExtrinsic({
    method: "addLiquidity",
    params: [0, 0, 0, 0, 0, 0],
    section: "dex",
  });

  const suggestToken1Max = useSuggestInput(
    account?.address,
    token1,
    true,
    mockCall
  );
  const suggestToken2Max = useSuggestInput(
    account?.address,
    token2,
    true,
    mockCall
  );

  const onTokenMax = useCallback(() => {
    const calcToken2MaxByToken1 = suggestToken1Max?.times(exchangeRate);
    const calcToken1MaxByToken2 = suggestToken2Max?.div(exchangeRate);

    if (calcToken2MaxByToken1?.isGreaterThan(suggestToken2Max)) {
      onToken1Change({
        amount: calcToken1MaxByToken2.toString(),
        token: token1,
      });
      onToken2Change({ amount: suggestToken2Max.toString(), token: token2 });
    } else {
      onToken1Change({ amount: suggestToken1Max.toString(), token: token1 });
      onToken2Change({
        amount: calcToken2MaxByToken1.toString(),
        token: token2,
      });
    }
  }, [
    amounts,
    suggestToken2Max,
    suggestToken1Max,
    amounts,
    onToken1Change,
    onToken2Change,
  ]);

  const onInputChange = useCallback(
    (input: number, data: BalanceCurrencyInputProps["value"]) => {
      if (
        Number(data.amount) > suggestToken1Max?.toNumber() ||
        Number(data.amount) > suggestToken2Max?.toNumber()
      ) {
        setErr("Insufficient KSM transferable balance");
      } else {
        setErr("");
      }
      if (input == 1) {
        onToken1Change(data);
        onToken2Change({
          amount: new FN(token1Ref.current.amount, token1?.decimals)
            .times(exchangeRate)
            .toString(),
          token: token2Ref.current.token,
        });
      } else {
        onToken2Change(data);
        onToken1Change({
          amount: new FN(token2Ref.current.amount, token2?.decimals)
            .div(exchangeRate)
            .toString(),
          token: token1Ref.current.token,
        });
      }
    },
    [
      onToken2Change,
      onToken1Change,
      token1Ref,
      token2Ref,
      exchangeRate,
      suggestToken1Max,
      suggestToken2Max,
    ]
  );

  useSubscription(() => {
    if (!liquidity || !selected) return;

    return liquidity.subscribePoolDetails(selected).subscribe({
      next: (data) => {
        const { amounts, share } = data;
        setTotalShare(share);
        setAmounts(amounts);
      },
    });
  }, [liquidity, selected]);

  useSubscription(() => {
    if (!liquidity || !selected) return;

    return liquidity
      .subscribeEstimateAddLiquidityResult(
        token1,
        token2,
        new FN(token1Value.amount || "0", token1?.decimals),
        new FN(token2Value.amount || "0", token2?.decimals),
        slippage
      )
      .subscribe({
        next: (data) => {
          const { incrementShare, incrementShareWithSlippage } = data;
          setIncrementShare(incrementShare);
          setIncrementShareWithSlippage(incrementShareWithSlippage);
        },
      });
  }, [liquidity, selected, token1Value, token2Value, slippage]);

  const params = useMemo(
    () => [
      token1?.toCurrencyId(api),
      token2?.toCurrencyId(api),
      new FN(token1Value.amount, token1?.decimals).toChainData(),
      new FN(token2Value.amount, token2?.decimals).toChainData(),
      incrementShareWithSlippage?.toChainData(),
      autoStake ? 1 : 0,
    ],
    [
      token1,
      token2,
      token1Value,
      token2Value,
      slippage,
      autoStake,
      api,
      incrementShareWithSlippage,
    ]
  );

  const radioOptions: RadioOption[] = [
    {
      value: LIQUIDITY_MODE.MODE_BOTH,
      label: `Add ${getTokenName(selected)}`,
      className: "ml-8 text-12 text-grey-3 font-medium",
    },
    {
      value: LIQUIDITY_MODE.MODE_TOKEN1,
      label: `Add ${getTokenName(token1)}`,
      className: "ml-8 text-12 text-grey-3 font-medium",
    },
    {
      value: LIQUIDITY_MODE.MODE_TOKEN2,
      label: `Add ${getTokenName(token2)}`,
      className: "ml-8 text-12 text-grey-3 font-medium",
    },
  ];

  const message = useMemo(
    () => `Add liquidity ${token1?.name} and ${token2?.name}`,
    [token1, token2]
  );

  return [
    selected,
    token1,
    token2,
    tokenList,
    liquidityMode,
    token1Value,
    token2Value,
    suggestToken1Max,
    suggestToken2Max,
    autoStake,
    amounts,
    incrementShare,
    totalShare,
    slippage,
    radioOptions,
    params,
    message,
    err,
    setMode,
    setSelected,
    onInputChange,
    setAutoStake,
    handleAddLiquidityClick,
    onTokenMax,
    setSlippage,
  ] as const;
};
