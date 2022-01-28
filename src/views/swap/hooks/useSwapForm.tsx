import { useCallback, useState, useEffect, useMemo } from "react";
import { BalanceCurrencyInputProps } from "../../../components/form";
import { useInput } from "../../../hooks/useInput";
import { SwapTradeMode } from "@acala-network/sdk-swap";
import { FixedPointNumber, Token } from "@acala-network/sdk-core";
import { remove } from "lodash";
import { useSuggestInput, usePresetCurrencies, useEnabledCurrenciesInSwap } from "../../../sdk";
import { getTokenName } from "../../../utils/token";
import { useExtrinsic, useActiveAccount } from "../../../connector";

/**
 * return all required informations about swap form
 */

type TokenList = BalanceCurrencyInputProps["currencies"];

const upperTokens = (
	token1: Token | undefined,
	token2: Token | undefined,
	all: Token[]
) => {
	const temp = [...all];

	remove(
		temp,
		(a: Token): boolean => a.name === token1?.name || a.name === token2?.name
	);

	return [token1, token2, ...temp];
};

export const useSwapForm = () => {
	const presetTokens = usePresetCurrencies();
	const account = useActiveAccount();
	const enabledCurrencies = useEnabledCurrenciesInSwap();
	const [tradeMode, setTradeMode] = useState<SwapTradeMode>("EXACT_INPUT");
	const [payTokenList, setPayTokenList] = useState<TokenList>([]);
	const [receiveTokenList, setReceiveTokenList] = useState<TokenList>([]);
	const [payValue, { onChange: onPayChange, ref: payRef }] = useInput({ init: { amount: '', token: undefined }});
	const [receiveValue, { onChange: onReceiveChange, ref: receiveRef }] = useInput({ init: { amount: '', token: undefined } });

	const [slippage, { onChange: onSlippageChange }] = useInput({ init: 0.005 });
	const [error, setError] = useState<string>();

	const [mockCall] = useExtrinsic({
		account: account?.address,
		method:
			tradeMode === "EXACT_INPUT"
				? "swapWithExactSupply"
				: "swapWithExactTarget",
		params: [[], "0", "0"],
		section: "dex",
	});

	const suggestPayMax = useSuggestInput(
		account?.address,
		payValue?.token,
		true,
		mockCall
	);
	const suggestReceiveMax = useSuggestInput(
		account?.address,
		receiveValue?.token,
		true,
		mockCall
	);

	const onPayMax = useCallback(() => {
		setTradeMode("EXACT_INPUT");
		onPayChange({
			...payRef.current,
			amount: suggestPayMax.toString(),
		});
	}, [suggestPayMax, onPayChange]);

	const onReceiveMax = useCallback(() => {
		setTradeMode("EXACT_OUTPUT");
		onReceiveChange({
			...receiveRef.current,
			amount: suggestReceiveMax.toString(),
		});
	}, [suggestReceiveMax, onReceiveChange]);

	const onToggle = useCallback(() => {
		const prevPay = payRef.current.token.clone();
		const prevReceive = receiveRef.current.token.clone();

		onPayChange({ amount: "", token: prevReceive });
		onReceiveChange({ amount: "", token: prevPay });
	}, [onPayChange, onReceiveChange]);

	// handle currencies selector properties
	useEffect(() => {
		if (!enabledCurrencies) return;

		const payTokenList = upperTokens(
			payRef.current.token,
			receiveValue.token,
			enabledCurrencies
		).map((item) => {
			return {
				token: item,
				onClick: item?.name === receiveValue.token?.name ? onToggle : undefined,
				disabled: item?.name === payValue.token?.name,
			};
		});

		const receiveTokenList = upperTokens(
			receiveValue.token,
			payValue.token,
			enabledCurrencies
		).map((item) => {
			return {
				token: item,
				onClick: item?.name === payValue.token?.name ? onToggle : undefined,
				disabled: item?.name === receiveValue.token?.name,
			};
		});

		setPayTokenList(payTokenList);
		setReceiveTokenList(receiveTokenList);
	}, [
		enabledCurrencies,
		payValue,
		receiveValue,
		onToggle,
		setPayTokenList,
		setReceiveTokenList,
	]);

	// set init trading pair
	// TODO: read init trading pari
	useEffect(() => {
		if (presetTokens?.liquidToken && presetTokens?.stakingToken) {
			onPayChange({ amount: '', token: presetTokens.stakingToken });
			onReceiveChange({ amount: '', token: presetTokens.liquidToken });
		}
	}, [presetTokens, onReceiveChange, onPayChange]);

	// check user input
	useEffect(() => {
		if (tradeMode === "EXACT_INPUT" && payValue.amount && suggestPayMax) {
			const payAmount = new FixedPointNumber(
				payValue.amount,
				payValue?.token?.decimals
			);

			setError(
				payAmount.gt(suggestPayMax)
					? `Insuffent ${getTokenName(payValue?.token)} Amount`
					: ""
			);
		} else if (tradeMode === "EXACT_OUTPUT" && receiveValue.amount && suggestReceiveMax) {
			const receiveAmount = new FixedPointNumber(
				receiveValue.amount,
				receiveValue?.token?.decimals
			);

			setError(
				receiveAmount.gt(suggestReceiveMax)
					? `Insuffent ${getTokenName(receiveValue?.token)} Amount`
					: ""
			);
		}
	}, [
		payValue,
		receiveValue,
		tradeMode,
		suggestPayMax,
		suggestReceiveMax,
		setError,
	]);

	const params = useMemo(() => {
		return {
			path: [payValue.token, receiveValue.token] as [Token, Token],
			amount: new FixedPointNumber(
				tradeMode === "EXACT_INPUT" ? payValue.amount : receiveValue.amount,
				tradeMode === "EXACT_INPUT"
					? payValue?.token?.decimals
					: receiveValue?.token?.decimals
			),
			mode: tradeMode,
		};
	}, [payValue, receiveValue, tradeMode]);

	return [
		tradeMode,
		payTokenList,
		receiveTokenList,
		payValue,
		receiveValue,
		suggestPayMax,
		suggestReceiveMax,
		slippage,
		params,
		error,
		setTradeMode,
		onPayChange,
		onReceiveChange,
		onPayMax,
		onReceiveMax,
		onToggle,
		onSlippageChange,
	] as const;
};
