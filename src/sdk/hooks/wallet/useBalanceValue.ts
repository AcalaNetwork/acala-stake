import { FixedPointNumber, Token } from "@acala-network/sdk-core";
import { useMemo } from "react";
import { SDKNetwork } from "../../types";
import { usePrice } from "./usePrice";

export const useBalanceValue = (
	network: SDKNetwork,
	token: Token,
	balance: FixedPointNumber | number | string
) => {
	const price = usePrice(network, token);

	return useMemo(() => {
		if (!price) return;

		return price.mul(
			balance instanceof FixedPointNumber
				? balance
				: new FixedPointNumber(balance, token.decimals)
		);
	}, [balance, price]);
};
