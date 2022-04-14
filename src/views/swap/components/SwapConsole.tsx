import { FixedPointNumber, MaybeCurrency } from "@acala-network/sdk-core";
import React, { useEffect } from "react";
import { Card } from "../../../components/Card";
import { BalanceCurrencyInput } from "../../../components/form";
import { FormPanel } from "../../../components/form/Panel";
import { FormatBalance } from "../../../components/FormatBalance";
import { TxButton } from "../../../components/TxButton";
import { useActiveAccount } from "../../../connector/hooks/useActiveAccount";
import { useSwapCall } from "../../../sdk/hooks/swap/useSwapCall";
import SwapBtn from "/public/icons/swap-btn.svg";
import { useSwapForm } from "../hooks";
import { SwapResultInfo } from "./SwapResult";

export const SwapConsole = () => {
	const active = useActiveAccount();
	const [
		tradeMode,
		payTokenList,
		receiveTokenList,
		payValue,
		receiveValue,
		payMaxAmount,
		receiveMaxAmount,
		slippage,
		params,
		formError,
		onTradeMode,
		onPayChange,
		onReceiveChange,
		onPayMax,
		onReceiveMax,
		onToggle,
		onSlippageChange,
	] = useSwapForm();

	const [parameters, call, message, fee, callError] = useSwapCall(params);

	// update the input value according to the sdk result
	useEffect(() => {
		if (!parameters) return;

		if (tradeMode === "EXACT_INPUT") {
			onReceiveChange({
				amount: parameters.output.balance.toString(),
				token: parameters.output.token,
			});
		}

		if (tradeMode === "EXACT_OUTPUT") {
			onPayChange({
				amount: parameters.input.balance.toString(),
				token: parameters.input.token,
			});
		}
	}, [parameters, onReceiveChange, onPayChange, tradeMode]);

	return (
		<Card
			className="container w-[630px] pt-32 pb-56 px-55"
			variant="border"
			loading={payTokenList.length === 0}
		>
			<FormPanel
				className="mb-15"
				label={`Pay With ${tradeMode === "EXACT_OUTPUT" ? "(Estimate)" : ""}`}
			>
				<BalanceCurrencyInput
					currencies={payTokenList}
					value={payValue}
					onChange={onPayChange}
					onMax={payMaxAmount ? onPayMax : undefined}
					onFocus={() => onTradeMode("EXACT_INPUT")}
				/>
				{active ? (
					<BalanceLabel amount={payMaxAmount} token={payValue.token} />
				) : null}
			</FormPanel>
			<div className="flex-center">
				<SwapBtn onClick={onToggle} />
			</div>
			<FormPanel
				className="mt-40"
				label={`Receive ${tradeMode === "EXACT_INPUT" ? "(Estimated)" : ""}`}
			>
				<BalanceCurrencyInput
					currencies={receiveTokenList}
					value={receiveValue}
					onChange={onReceiveChange}
					onMax={receiveMaxAmount ? onReceiveMax : undefined}
					onFocus={() => onTradeMode("EXACT_OUTPUT")}
				/>
				{active ? (
					<BalanceLabel amount={receiveMaxAmount} token={receiveValue.token} />
				) : null}
			</FormPanel>
			<TxButton
				className="w-full mt-32"
				error={formError || callError || ""}
				call={call}
				message={message}
			>
				Swap
			</TxButton>
			<SwapResultInfo
				slippage={slippage}
				onSlippageChange={onSlippageChange}
				parameters={parameters}
				fee={fee}
			/>
		</Card>
	);
};

const BalanceLabel = ({
	amount,
	token,
}: {
	amount?: FixedPointNumber;
	token: MaybeCurrency;
}) => {
	return (
		<div className="flex items-center justify-end mt-8 text-14 leading-17 font-medium">
			<p className="text-grey-3 mr-4">Balance:</p>
			<div className="text-333">
				<FormatBalance balance={amount} token={token} />
			</div>
		</div>
	);
};
