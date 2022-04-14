import {
  MaybeCurrency,
  Token,
} from "@acala-network/sdk-core";
import React, { FC, useCallback, useMemo } from "react";
import { TokenImage } from "../TokenImage";
import TriangleIcon from "/public/icons/triangle.svg";
import { TokenName } from "../TokenName";
import { Selector } from "./Selector";
import { useBoolean, useMemoized } from "../../hooks";
import { BaseInputRoot } from "./BaseInputRoot";
import { Size } from "../types";

export interface CurrencyItem {
	size?: Size;
	token: MaybeCurrency;
	className?: string;
	disabled?: boolean;
	onClick?: () => void;
	render?: (value?: Token) => JSX.Element;
}

export interface CurrencySelectorProps {
	currencies: CurrencyItem[]; // required filed for select token
	value?: Token;
	onChange?: (value?: Token) => void;
	disabled?: MaybeCurrency[];
	className?: string;
	rootClassName?: string;
}

interface CurrencyInputProps {
	size?: Size;
	value: Token;
	focuse: boolean;
	onFocuse: () => void;
	className?: string;
}

const CurrencyInput: FC<CurrencyInputProps> = React.memo(
  ({ size, value, focuse, onFocuse }) => {
    return (
      <BaseInputRoot className="border-none"
        focuse={focuse}>
        <div className="flex-1 flex items-center"
          onClick={onFocuse}>
          <TokenImage size={size}
            token={value} />
          <TokenName
            className="mx-8 leading-20 text-16 font-medium text-494853"
            token={value}
          />
        </div>
        <TriangleIcon aria-hidden="true" />
      </BaseInputRoot>
    );
  }
);

function defaultCurrencyItemRender(value: Token) {
  return (
    <div className="py-12 px-8 rounded-8 flex items-center hover:bg-fff">
      <TokenImage size="sm"
        token={value} />
      <TokenName
        className="ml-8 font-medium text-16 leading-20 text-grey-3"
        token={value}
      />
    </div>
  );
}

export const CurrencySelector: FC<CurrencySelectorProps> = ({
  currencies,
  value,
  onChange,
  className,
  rootClassName
}) => {
  const memCurrencies = useMemoized(currencies);
  const [focuse, , onFocuse, onBlur] = useBoolean();

  const items = useMemo(() => {
    return memCurrencies.map((item) => {
      return {
        value: item.token,
        render: item.render ? item.render : defaultCurrencyItemRender,
      };
    });
  }, [memCurrencies]);

  const render = useCallback(
    (value: Token) => {
      return (
        <CurrencyInput
          className={className}
          focuse={focuse}
          onFocuse={onFocuse}
          value={value}
        />
      );
    },
    [focuse, value, onFocuse]
  );

  return (
    <Selector
      items={items}
      onBlur={onBlur}
      onChange={onChange}
      render={render}
      rootClassName={rootClassName}
      value={value}
    />
  );
};
