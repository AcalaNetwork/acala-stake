import { Token } from "@acala-network/sdk-core";
import { useEffect, useState } from "react";
import { BalanceData } from "@acala-network/sdk/wallet/type";
import { useWallet } from ".";

export const useBalance = (account: string, token: Token, type: keyof BalanceData = 'available') => {
	const [data, setData] = useState <BalanceData>();
  const wallet = useWallet();

  useEffect(() => {
    if (!wallet) return;

    const sub = wallet.subscribeBalance(token, account).subscribe({ next: setData });

    return () => sub.unsubscribe();
  }, [wallet]);

  return data[type];
};
