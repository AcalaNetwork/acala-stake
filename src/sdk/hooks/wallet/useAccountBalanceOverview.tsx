import { FixedPointNumber, Token } from "@acala-network/sdk-core";
import { ReactElement, useMemo, useState } from "react";
import { useTokens, useWallet } from ".";
import { useSubscription } from "../../../hooks/useSubscription";
import { combineLatest } from "rxjs";
import { BalanceData } from "@acala-network/sdk/wallet/type";
import { FormatBalance } from "../../../components/FormatBalance";
import { FormatValue } from "../../../components/FormatValue";

interface Configs {
	address: string;
	display: "USD" | "TOKEN";
}

export interface BalanceOverviewItem {
	token: Token;
	total: FixedPointNumber;
	price: FixedPointNumber;
	display: ReactElement;
}

function mapper(data: {
	balances: Record<string, BalanceData>;
	prices: Record<string, FixedPointNumber>;
}): Omit<BalanceOverviewItem, "display">[] {
  const { balances, prices } = data;

  return Object.entries(balances).map(([name, balance]) => {
    const token = balance.token;
    const total = balance.free;
    const price = prices[name];

    return {
      token,
      total,
      price,
    };
  });
}

export function useAccountBalanceOverview(configs: Configs) {
  const { address, display } = configs;
  const allTokens = useTokens();
  const wallet = useWallet();
  const [data, setData] = useState<Omit<BalanceOverviewItem, "display">[]>([]);

  useSubscription(() => {
    if (!wallet || !address || !allTokens?.length) return;

    const balances$ = combineLatest({
      ...Object.fromEntries(
        allTokens.map((item) => [
          item.name,
          wallet.subscribeBalance(item, address),
        ])
      ),
    });

    const price$ = combineLatest({
      ...Object.fromEntries(
        allTokens.map((item) => [item.name, wallet.subscribePrice(item)])
      ),
    });

    return combineLatest({
      balances: balances$,
      prices: price$,
    }).subscribe((data) => {
      setData(mapper(data));
    });
  }, [wallet, address, allTokens]);

  return useMemo(() => {
    return data.map((item) => {
      return {
        ...item,
        display:
					display === "TOKEN" ? (
					  <FormatBalance balance={item.total} />
					) : (
					  <FormatValue data={item.total && item.price ? item.total.mul(item.price) : null} />
					),
      };
    });
  }, [data, display]);
}
