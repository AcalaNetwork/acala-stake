import { useSubscription } from "../../../hooks/useSubscription";
import { useWallet } from "../../../sdk";
import { useHoma } from "../../../sdk/hooks/homa";
import { combineLatest } from "rxjs";
import { filter, switchMap } from "rxjs/operators";
import { useMemo, useState } from "react";
import { FixedPointNumber, Token } from "@acala-network/sdk-core";
import { useActiveAccount } from "../../../connector";

export interface StakeData {
  token?: Token;
  totalAmount?: FixedPointNumber;
  totalValue?: FixedPointNumber;
  earningValue?: FixedPointNumber;
  earningAmount?: FixedPointNumber;
  apy?: number;
  airdrop?: FixedPointNumber;
}

export const useMyStake = (_token: "KSM" | "DOT") => {
  const network = useMemo(
    () => (_token === "KSM" ? "karura" : "acala"),
    [_token]
  );
  const { address } = useActiveAccount();
  const wallet = useWallet(network);
  const homa = useHoma(network);
  const { liquidToken, stakingToken } = homa.consts;
  const [result, setResult] = useState<StakeData>({});

  useSubscription(() => {
    if (!wallet || !homa) return;

    return combineLatest({
      homaReady: homa.isReady$,
      walletReady: wallet.isReady$,
    })
      .pipe(
        filter(({ homaReady, walletReady }) => homaReady && walletReady),
        switchMap(() => {
          return combineLatest({
            homaEnv: homa.subscribeEnv(),
            stakingTokenPrice: wallet.subscribePrice(stakingToken),
            liquidTokenBalance: wallet.subscribeBalance(liquidToken, address),
          });
        })
      )
      .subscribe({
        next: ({ homaEnv, stakingTokenPrice, liquidTokenBalance }) => {
          const { exchangeRate, apy } = homaEnv;

          const stakingAmount = exchangeRate.mul(liquidTokenBalance.available);

          const stakingValue = stakingTokenPrice.mul(
            stakingAmount || FixedPointNumber.ZERO
          );

          const earningValue = stakingValue.mul(new FixedPointNumber(apy));

          const earningAmount = earningValue.div(stakingTokenPrice);

          setResult({
            token: stakingToken,
            totalAmount: stakingAmount,
            totalValue: stakingValue,
            apy,
            earningValue,
            earningAmount,
          });
        },
      });
  }, [wallet, homa, address, _token]);

  return result;
};
