import { FixedPointNumber, Token } from "@acala-network/sdk-core";
import { SwapTradeMode } from "@acala-network/sdk-swap";
import { SwapParameters } from "@acala-network/sdk-swap/swap-parameters";
import { useEffect, useMemo, useRef, useState } from "react";
import { Subscription } from "rxjs";
import { useSwap } from "..";
import { useActiveAccount } from "../../../connector/hooks/useActiveAccount";
import { useExtrinsic } from "../../../connector/hooks/useExtrinsic";
import { useMemoized } from "../../../hooks";
import { getTokenName } from "../../../utils/token";

interface configs {
	path: [Token, Token];
	amount: FixedPointNumber;
	mode: SwapTradeMode;
}
export const useSwapCall = (_configs: configs) => {
	const active = useActiveAccount();
	const configs = useMemoized(_configs);
	const { path, amount, mode } = configs;
	const subscription = useRef<Subscription>();
	const [error, setError] = useState<string>("");
	const [result, setResult] = useState<SwapParameters | undefined>();
	const swap = useSwap();

	const fn = useMemo(
		() =>
			(path: [Token, Token], amount: FixedPointNumber, mode: SwapTradeMode) => {
				subscription.current = swap.swap(path, amount, mode).subscribe({
					error: (error: Error) => {
						if (amount.toString() !== "0" && amount.isFinaite()) {
							switch (error.name) {
								case "AmountTooSmall": {
									setError("Enter An Amount");
									break;
								}

								case "InsufficientLiquidity": {
									setError("Insufficient Liquidity");
									break;
								}

								case "NoTradingPath": {
									setError("Invalidated Trading Path");
									break;
								}
							}
						}

						setResult(undefined);
					},
					next: (result) => {
						if (!result.input) return;

						setError("");
						setResult(result);
					},
				});
			},
		[swap, setError, setResult]
	);

	useEffect(() => {
		if (!swap) return;

		// unsubscribe first
		if (subscription.current) subscription.current.unsubscribe();

		// ensure all params is ready
		if (!path || !path[0] || !path[1] || amount.isZero()) return;

		fn(path, amount, mode);
	}, [swap, path, amount, mode]);

	const [call, fee] = useExtrinsic({
		account: active?.address,
		section: "dex",
		method:
			configs.mode === "EXACT_INPUT"
				? "swapWithExactSupply"
				: "swapWithExactTarget",
		params: result?.toChainData(),
	});

	const message = useMemo(() => {
		if (!result) return "";

		return `Swap ${getTokenName(result.output.token)} from ${getTokenName(
			result.input.token
		)}`;
	}, [result]);

	return [result, call, message, fee, error] as const;
};
