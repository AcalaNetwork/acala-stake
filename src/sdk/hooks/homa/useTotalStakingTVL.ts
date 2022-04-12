import { useWallet } from ".."
import { useSubscription } from "../../../hooks/useSubscription";
import { useHoma } from "./useHoma";
import { combineLatest } from 'rxjs';
import { useState } from "react";
import { FixedPointNumber } from "@acala-network/sdk-core";

export const useTotalStakingTVL = () => {
  const karuraWallet = useWallet('karura');
  const acalaWallet = useWallet('acala');
  const karuraHoma = useHoma('karura');
  const acalaHoma = useHoma('acala');
  const [result, setResult] = useState<FixedPointNumber>(FixedPointNumber.ZERO);

  useSubscription(() => {
    if (!karuraHoma || !acalaHoma || !karuraWallet || !acalaWallet) return;

    const { stakingToken: acalaStakingToken } = acalaHoma.consts;
    const { stakingToken: karuraStakingToken } = karuraHoma.consts;

    return combineLatest({
      acalaHomaEnv: acalaHoma.subscribeEnv(),
      karuraHomaEnv: karuraHoma.subscribeEnv(),
      acalaStakingPrice: acalaWallet.subscribePrice(acalaStakingToken),
      karuraStakingPrice: karuraWallet.subscribePrice(karuraStakingToken)
    }).subscribe({
      next: ({ acalaHomaEnv, karuraHomaEnv, acalaStakingPrice, karuraStakingPrice }) => {
        if (!acalaHomaEnv.totalStaking || !karuraHomaEnv.totalStaking || !acalaStakingPrice || !karuraStakingPrice) return;

        setResult(
          acalaHomaEnv.totalStaking
            .mul(acalaStakingPrice)
            .add(karuraHomaEnv.totalStaking.mul(karuraStakingPrice))
        )
      }
    })
  }, [karuraHoma, acalaHoma, karuraWallet, acalaWallet]);

  return result;
}