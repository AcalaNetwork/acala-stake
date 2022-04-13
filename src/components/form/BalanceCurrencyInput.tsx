import React, { FC, useCallback } from "react";
import { Token } from "@acala-network/sdk-core";
import { NumInput, NumInputProps } from "./NumInput";
import { CurrencySelector, CurrencySelectorProps } from "./CurrencySelector";
import { Button } from "../Button";

interface BalanceCurrencyInputValue {
	token: Token;
	amount: number | string;
}

export interface BalanceCurrencyInputProps
	extends Omit<NumInputProps, "value" | "onChange"> {
	value?: BalanceCurrencyInputValue;
	currencies?: CurrencySelectorProps["currencies"];
	onChange?: (value: BalanceCurrencyInputValue) => void;
	onMax?: () => void;
}

export const BalanceCurrencyInput: FC<BalanceCurrencyInputProps> = ({
  currencies,
  value,
  onMax,
  onChange,
  ...rest
}) => {
  const onNumChange = useCallback(
    (userInput: string) => {
      onChange({
        amount: userInput,
        token: value?.token,
      });
    },
    [onChange, value]
  );

  const onTokenChange = useCallback(
    (userInput: Token) => {
      onChange({
        amount: value?.amount,
        token: userInput,
      });
    },
    [onChange, value]
  );

  return (
    <div className="relative flex items-stretch border border-e8e7f0 h-58 rounded-8 bg-f1f0f2">
      <NumInput
        onChange={onNumChange}
        placeholder="0.0"
        value={value?.amount}
        {...rest}
      />
      {onMax ? (
        <Button
          color="primary"
          onClick={onMax}
          style={{ fontWeight: 500, paddingRight: 0 }}
          variant="text"
        >
					Max
        </Button>
      ) : null}
      <CurrencySelector
        currencies={currencies || []}
        onChange={onTokenChange}
        value={value?.token}
      />
    </div>
  );
};
