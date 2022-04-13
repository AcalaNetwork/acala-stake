import {
  FixedPointNumber,
  forceToCurrencyName,
  MaybeCurrency,
} from "@acala-network/sdk-core";
import React, { FC, memo, ReactNode, useCallback } from "react";
import { formatBalance } from "../utils/formatBalance";
import { getTokenName } from "../utils/token";
import { FormatNumber, FormatNumberProps } from "./FormatNum";

export interface BalancePair {
	balance?: string | number | FixedPointNumber;
	token?: MaybeCurrency;
}

export interface FormatBalanceProps extends Omit<FormatNumberProps, "data"> {
	loading?: boolean;
	balance?: BalancePair["balance"];
	token?: BalancePair["token"];
	icon?: boolean;
	pair?: BalancePair[];
	pairSymbol?: string;
	decimalLength?: number;
	negativeToZero?: boolean;
}

const defaultFormatBalanceConfig: FormatNumberProps["formatNumberConfig"] = {
  decimalLength: 4,
  removeEmptyDecimalParts: true,
  removeTailZero: true,
};

const MIN = 0.0000001;

export const FormatBalance: FC<FormatBalanceProps> = memo(
  ({
    balance,
    className,
    decimalLength = 4,
    loading,
    negativeToZero = true,
    pair,
    pairSymbol,
    token,
    ...other
  }) => {
    const pairLength = pair ? pair.length : 0;

    const renderBalance = useCallback(
      (data: BalancePair, index: number): ReactNode => {
        const balance = formatBalance(data?.balance);

        const displayNumber = isFinite(balance) && balance > MIN ? balance : 0;

        let showZero = false;

        if (negativeToZero) {
          showZero = displayNumber < 0;
        }

        const formatNumberConfig = { ...defaultFormatBalanceConfig };

        if (decimalLength) formatNumberConfig.decimalLength = decimalLength;

        return [
          <FormatNumber
            data={showZero ? 0 : balance || 0}
            formatNumberConfig={formatNumberConfig}
            human={false}
            key={"format-balance-balance" + index}
            loading={loading}
            {...other}
          />,
          data.token ? (
            <span key={"format-balance-token" + index}>
              {" " + getTokenName(forceToCurrencyName(data.token))}
            </span>
          ) : null,
          pairSymbol && index !== pairLength - 1 ? (
            <span className="symbol"
              key={"format-balance-symbol-" + index}>
              {" "}
              {pairSymbol}{" "}
            </span>
          ) : null,
        ];
      },
      [negativeToZero, decimalLength, loading, other, pairSymbol, pairLength]
    );

    return (
      <div className={`whitespace-nowrap ${className ?? ""}`}>
        {pair
          ? pair.map((data, index) => renderBalance(data, index))
          : renderBalance({ balance, token }, -1)}
      </div>
    );
  }
);
