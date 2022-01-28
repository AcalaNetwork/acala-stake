import { FixedPointNumber, Token } from "@acala-network/sdk-core";
import React from "react";
import { useBalanceValue } from "../sdk/hooks/wallet/useBalanceValue";
import { SDKNetwork } from "../sdk/types";
import { FormatNumberProps } from "./FormatNum";
import { FormatValue } from "./FormatValue";

interface BalanceValueProps extends Omit<FormatNumberProps, 'data'> {
	network: SDKNetwork;
	token: Token;
	balance: FixedPointNumber | number | string;
}

export const BalanceValue = React.memo<BalanceValueProps>(
	({ network, token, balance, ...remained }) => {
		const value = useBalanceValue(network, token, balance);

		return <FormatValue data={value} {...remained} />;
	}
);
