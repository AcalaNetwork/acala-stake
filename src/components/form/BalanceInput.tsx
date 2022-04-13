import React, { FC, useCallback } from "react";
import { FixedPointNumber, Token } from "@acala-network/sdk-core";
import { NumInput, NumInputProps } from "./NumInput";
import { Button } from "../Button";
import { TokenImage } from "../TokenImage";
import { TokenName } from "../TokenName";

export interface BalanceInputProps
	extends Omit<NumInputProps, "value" | "onChange"> {
	value?: string;
	currency?: Token;
	onChange?: (value: string) => void;
	onMax?: () => void;
}

export const BalanceInput: FC<BalanceInputProps> = ({
  currency,
  value,
  onMax,
  onChange,
  ...rest
}) => {
  const onNumChange = useCallback(
    (userInput: string) => {
      if (!onChange) return;

      onChange(userInput);
    },
    [onChange, value, currency]
  );

  return (
    <div className="relative flex items-stretch border border-e8e7f0 h-60 rounded-8 bg-f1f0f2">
      <NumInput
        onChange={onNumChange}
        placeholder="0.0"
        value={value}
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
      {currency ? (
        <div className="flex-center pl-10 pr-16 text-16 font-medium text-494853">
          <TokenImage token={currency} />
          <TokenName className="ml-4"
            token={currency} />
        </div>
      ) : null}
    </div>
  );
};
