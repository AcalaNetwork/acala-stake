import { useSubscription } from "../../../hooks/useSubscription";
import { useWallet } from "../../../sdk";
import { useHoma } from "../../../sdk/hooks/homa";
import { combineLatest } from "rxjs";
import { filter, switchMap } from "rxjs/operators";
import { useState } from "react";
import { FixedPointNumber, Token } from "@acala-network/sdk-core";
import { useActiveAccount } from "../../../connector";

export interface StakeData {
  token: Token;
  totalAmount: FixedPointNumber;
  totalValue: FixedPointNumber;
  earning: FixedPointNumber;
  apy: number;
  airdrop?: FixedPointNumber;
}

export interface Itotal {
  totalAmount: FixedPointNumber;
  totalValue: FixedPointNumber;
  earning: FixedPointNumber;
}

export const useStakesCalculator = () => {
  const {address} = useActiveAccount();
  const karuraWallet = useWallet("karura");
  const acalaWallet = useWallet("acala");
  const karuraHoma = useHoma("karura");
  const acalaHoma = useHoma("acala");
  const { liquidToken: karuraLiquidToken, stakingToken: karuraStakingToken } = karuraHoma.consts;
  const { liquidToken: acalaLiquidToken, stakingToken: acalaStakingToken } = acalaHoma.consts;
  const [result, setResult] = useState<StakeData[]> ();
  const [total, setTotal] = useState<Itotal>()

  useSubscription(() => {
    if (!karuraHoma || !acalaHoma || !karuraWallet || !acalaWallet) return;

    return combineLatest({
      acalaHomaReady: acalaHoma.isReady$,
      karuraHomaReady: karuraHoma.isReady$,
      acalaWalletReady: acalaWallet.isReady$,
      karuraWalletReady: karuraWallet.isReady$
    })
      .pipe(
        filter(
          ({ acalaHomaReady, karuraHomaReady, acalaWalletReady, karuraWalletReady }) =>
            acalaHomaReady && karuraHomaReady && acalaWalletReady && karuraWalletReady
        ),
        switchMap(() => {
          return combineLatest({
            acalaHomaEnv: acalaHoma.subscribeEnv(),
            karuraHomaEnv: karuraHoma.subscribeEnv(),
            acalaStakingPrice: acalaWallet.subscribePrice(acalaStakingToken),
            karuraStakingPrice: karuraWallet.subscribePrice(karuraStakingToken),
            acalaLiquidTokenBalace: acalaWallet.subscribeBalance(acalaLiquidToken, address),
            karuraLiquidTokenBalance: karuraWallet.subscribeBalance(karuraLiquidToken, address)
          });
        })
      )
      .subscribe({
        next: ({
          acalaHomaEnv,
          karuraHomaEnv,
          acalaStakingPrice,
          karuraStakingPrice,
          acalaLiquidTokenBalace,
          karuraLiquidTokenBalance
        }) => {
          const {exchangeRate: acalaExchangeRate, apy: acalaApy} = acalaHomaEnv;
          const {exchangeRate: karuraExchangeRate, apy: karuraApy} = karuraHomaEnv;

          const acalaStakingAmount = acalaExchangeRate.mul(acalaLiquidTokenBalace.available);
          const karuraStakingAmount = karuraExchangeRate.mul(karuraLiquidTokenBalance.available);

          const acalaStakingValue = acalaStakingPrice.mul(acalaStakingAmount || FixedPointNumber.ZERO);
          const karuraStakingValue = karuraStakingPrice.mul(karuraStakingAmount || FixedPointNumber.ZERO);

          const acalaEarning = acalaStakingValue.mul(new FixedPointNumber(acalaApy));
          const karuraRarning = karuraStakingValue.mul(new FixedPointNumber(karuraApy));

          setResult([
            {
              token: acalaStakingToken,
              totalAmount: acalaStakingAmount,
              totalValue: acalaStakingValue,
              apy: acalaApy,
              earning: acalaEarning,
            },{
              token: karuraStakingToken,
              totalAmount: karuraStakingAmount,
              totalValue: karuraStakingValue,
              apy: karuraApy,
              earning: karuraRarning
            },
          ])

          setTotal({
            totalAmount: acalaStakingAmount.plus(karuraStakingAmount),
            totalValue: acalaStakingValue.plus(karuraStakingValue),
            earning: acalaEarning.plus(karuraRarning)
          })

        },
      });
  }, [karuraHoma, acalaHoma, karuraWallet, acalaWallet, address]);

  return {result, total}
};
