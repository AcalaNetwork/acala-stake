import { useWallet } from "@sdk";
import { useEffect, useState } from "react";
import { InjectedAccount } from '@polkadot/extension-inject/types';
import { BalanceData } from "@acala-network/sdk/wallet/type";

export interface BalanceAccount extends InjectedAccount {
  ksm: BalanceData;
  dot: BalanceData;
}

export const useAccountBalance = (injectedAccounts: InjectedAccount[]) => {
  const awallet = useWallet('acala');
  const kwallet = useWallet('karura');
  const [data, setData] = useState<BalanceAccount[]>();
  
  useEffect(() => {
    if(!injectedAccounts || !injectedAccounts.length) return;

    const run = async () => {
      const balance = await Promise.all(injectedAccounts.map(async account => {
        const ksm = await kwallet?.getBalance('KSM', account.address);
        const dot = await awallet?.getBalance('DOT', account.address);
        return {
          ...account,
          ksm,
          dot
        };
      }));
      setData(balance);
    };

    if(!data || !data.length) {
      run();
    }
  
  }, [awallet, data, injectedAccounts, kwallet]);

  return data;
};