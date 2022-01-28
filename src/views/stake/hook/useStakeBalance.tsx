import { useSubscription } from "../../../hooks/useSubscription";
import { useWallet } from "../../../sdk";
import { useHomaAPY, useHomaConts, useHomaEnv } from "../../../sdk/hooks/homa";
import { combineLatest } from "rxjs";
import { filter, switchMap } from "rxjs/operators";
import { useActiveAccount } from "../../../connector";
import { useMemo, useState } from "react";
import { FixedPointNumber, Token } from "@acala-network/sdk-core";

interface StakingBalance {
  available?: FixedPointNumber;
  staked?: FixedPointNumber;
  apy?: number;
  liquidToken?: Token;
}

export const useStakeBalance = (token: "KSM" | "DOT") => {
  const { address } = useActiveAccount();
  const network = useMemo(
    () => (token === "KSM" ? "karura" : "acala"),
    [token]
  );
  const homa = useHomaConts(network);
  const apy = useHomaAPY(network);
  const wallet = useWallet(network);

  const { liquidToken, stakingToken } = homa;

  const [result, setResult] = useState<StakingBalance>({});

  useSubscription(() => {
    if (!wallet) return;

    return wallet.isReady$
      .pipe(
        switchMap(() => {
          return combineLatest({
            liquidBalance: wallet.subscribeBalance(liquidToken, address),
            stakingBalance: wallet.subscribeBalance(stakingToken, address),
          });
        })
      )
      .subscribe({
        next: ({ liquidBalance, stakingBalance }) => {
          setResult({
            available: stakingBalance.available,
            staked: liquidBalance.available,
            apy,
            liquidToken,
          });
        },
      });
  }, [wallet, apy, token, address]);

  return result;
};
