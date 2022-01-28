import { Token } from "@acala-network/sdk-core";
import { ReactNode } from "react";

export interface CurrencyItem {
  token: Token;
  className?: string;
  disabled?: boolean;
  render?: (token: Token) => ReactNode;
}