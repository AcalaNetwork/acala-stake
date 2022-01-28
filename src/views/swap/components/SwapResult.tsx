import { FixedPointNumber, Token } from "@acala-network/sdk-core";
import { SwapParameters } from "@acala-network/sdk-swap/swap-parameters";
import React, { FC, ReactNode } from "react";
import { ExchangeRate } from "../../../components/ExchangeRate";
import { FormatBalance } from "../../../components/FormatBalance";
import { FormatRatio } from "../../../components/FormatRatio";
import { List, ListItem, ListLabel, ListValue } from "../../../components/List";
import { TokenImage } from "../../../components/TokenImage";
import { usePresetCurrencies } from "../../../sdk/hooks/wallet/usePresetCurrencies";
import ArrowRight from "/public/icons/arrow-right.svg";

interface SwapParameterProps {
	slippage: number;
	onSlippageChange: (value: number) => void;
	parameters?: SwapParameters;
	fee: FixedPointNumber;
}

export const SwapResultInfo: FC<SwapParameterProps> = ({
	slippage,
	parameters,
	fee,
}) => {
	const presetTokens = usePresetCurrencies();
  const nativeToken = presetTokens?.nativeToken;

	return (
		<List className="mt-20" shadow={false}>
			{parameters?.output ? (
				<ListItem>
					<ListLabel>
						{parameters?.mode === "EXACT_INPUT"
							? "Minimum Received"
							: "Maximum sold"}
					</ListLabel>
					<ListValue>
						{parameters?.mode === "EXACT_INPUT" ? (
							<FormatBalance
								balance={parameters.output.balance.times(
									new FixedPointNumber(1 - slippage)
								)}
								token={parameters.output.token}
							/>
						) : (
							<FormatBalance
								balance={parameters.input.balance.times(
									new FixedPointNumber(1 + slippage)
								)}
								token={parameters.input.token}
							/>
						)}
					</ListValue>
				</ListItem>
			) : null}
			{parameters?.input ? (
				<ListItem>
					<ListLabel>Price</ListLabel>
					<ListValue>
						<ExchangeRate
							balance1={parameters.input.balance}
							balance2={parameters.output.balance}
							token1={parameters.input.token}
							token2={parameters.output.token}
						/>
					</ListValue>
				</ListItem>
			) : null}
			{parameters?.naturalPriceImpact ? (
				<ListItem>
					<ListLabel>Price Impact</ListLabel>
					<ListValue>
						<FormatRatio
							data={parameters?.naturalPriceImpact}
							formatNumberConfig={{ decimalLength: 2 }}
						/>
					</ListValue>
				</ListItem>
			) : null}
			{parameters?.exchangeFee ? (
				<ListItem>
					<ListLabel>Trading Fee</ListLabel>
					<ListValue>
						<FormatBalance
							balance={parameters.exchangeFee}
							token={parameters.input.token}
						/>
					</ListValue>
				</ListItem>
			) : null}
			{parameters && (parameters?.path?.length || 0) > 2 ? (
				<ListItem>
					<ListLabel>Route</ListLabel>
					<ListValue>
						<SwapRoute path={parameters?.path} />
					</ListValue>
				</ListItem>
			) : null}
			{fee &&
			!fee.isZero() &&
			parameters?.output &&
			!parameters.output.balance.isZero() ? (
				<ListItem>
					<ListLabel>Flexi Fee</ListLabel>
					<ListValue>
						<FormatBalance balance={fee} token={nativeToken} />
					</ListValue>
				</ListItem>
			) : null}
		</List>
	);
};

interface SwapRouteProps {
	path: Token[];
}

const SwapRoute: FC<SwapRouteProps> = ({ path }) => {
	return (
		<div className="text-14 leading-17 flex items-center ml-8">
			{path.map((item, index): ReactNode[] => {
				return [
					<TokenImage key={`${item.toString()}`} token={item} />,
					index < path.length - 1 ? (
						<ArrowRight key={`${item.toString()}-arrow`} />
					) : null,
				];
			})}
		</div>
	);
};
