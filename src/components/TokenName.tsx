import { forceToCurrencyName, MaybeCurrency } from "@acala-network/sdk-core";
import React, { FC } from "react";
import { getTokenFullName, getTokenName } from "../utils/token";

export interface TokenProps {
	token: MaybeCurrency;
	className?: string;
	render?: (name: string) => string;
}

export const TokenName: FC<TokenProps> = ({ className, token, render }) => {
  if (!token) return null;

  const name = forceToCurrencyName(token);
  const display = getTokenName(name);

  return <div className={className}>{render ? render(display) : display}</div>;
};

export const TokenFullName: FC<TokenProps> = ({ className, token, render }) => {
  if (!token) return null;

  const name = forceToCurrencyName(token);
  const fullName = getTokenFullName(name);

  return (
    <div className={className}>{render && fullName ? render(fullName) : fullName}</div>
  );
};
