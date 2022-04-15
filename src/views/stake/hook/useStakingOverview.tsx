import { useHomaEnv } from "../../../sdk/hooks/homa";
import { useState } from "react";
import { FixedPointNumber } from "@acala-network/sdk-core";
import { SDKNetwork } from "@sdk/types";
import { useBalanceOverview } from "./useBalanceOverview";
import { useEffect } from "react";
import { TokenAmount } from "@connector/types";
import { usePrice } from "@sdk";

export interface StakingOverview {
  staked: TokenAmount;
  stakedValue: FixedPointNumber;
  estEarning: TokenAmount;
  estEarningValue: FixedPointNumber;
  apy: number;
  airdrop: TokenAmount;
}

export const useStakingOverview = (network: SDKNetwork) => {
  const { liquidBalance, stakingToken } = useBalanceOverview(network);
  const env = useHomaEnv(network);
  const [result, setResult] = useState<StakingOverview>();
  const price = usePrice(network, stakingToken);

  useEffect(() => {
    if (!env || !price) return;

    const stakedBalance = liquidBalance.mul(env.exchangeRate);
    const estEarning = stakedBalance.mul(new FixedPointNumber(env.apy, 18));
    const stakedValue = stakedBalance.mul(price);
    const estEarningValue = estEarning.mul(price);

    setResult({
      staked: {
        token: stakingToken,
        amount: stakedBalance
      },
      stakedValue,
      apy: env.apy,
      estEarning: {
        token: stakingToken,
        amount: estEarning
      },
      estEarningValue,
      airdrop: {
        token: stakingToken,
        amount: estEarning
      }
    });
  }, [env, liquidBalance, price, stakingToken]);

  return result;
};
