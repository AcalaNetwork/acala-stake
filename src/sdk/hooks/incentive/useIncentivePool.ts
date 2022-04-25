import { Token } from "@acala-network/sdk-core";
import { IncentivePool, IncentiveType } from "@acala-network/sdk/incentive/types";
import { useSubscription } from "@hooks";
import { SDKNetwork } from "@sdk/types";
import { useState } from "react";
import { useIncentive } from "./useIncentive";

export const useIncentivePool = (network: SDKNetwork, type: IncentiveType, token: Token) => {
  const [pool, setPool] = useState<IncentivePool | undefined>();
  const incentive = useIncentive(network);

  useSubscription(() => {
    if (!incentive) return;

    return incentive.subscribeIncentivePool(type, token.name).subscribe({
      next: setPool
    });
  }, [incentive]);

  return pool;
};