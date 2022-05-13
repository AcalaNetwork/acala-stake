import { Token } from "@acala-network/sdk-core";
import { IncentiveType } from "@acala-network/sdk/incentive/types";
import { useIncentivePool } from "@sdk";
import { SDKNetwork } from "@sdk/types";
import { useMemo } from "react";

export const useAPY = (network: SDKNetwork, token: Token) => {
  const isKarura = useMemo(() => network === 'karura', [network]);
  const apy = useMemo(() => isKarura ? 0.1992 : 0.1450, [isKarura]);
  const liquidTokenIncentive = useIncentivePool(network, IncentiveType.LOANS, token);

  const rewardApy = useMemo(() => {
    return liquidTokenIncentive?.apr.aprWithDeduction && !(liquidTokenIncentive?.apr.aprWithDeduction == 0) && !isNaN(liquidTokenIncentive?.apr.aprWithDeduction) ? liquidTokenIncentive.apr.aprWithDeduction : undefined;
  }, [liquidTokenIncentive]);

  return {
    apy,
    rewardApy
  };
};