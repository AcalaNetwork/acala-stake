import { Token } from "@acala-network/sdk-core";
import { UserIncentivePool } from "@acala-network/sdk/incentive/types";
import { useActiveAccount } from "@connector";
import { useSubscription } from "@hooks";
import { SDKNetwork } from "@sdk/types";
import { useState } from "react";
import { useIncentive } from "./useIncentive";

export const useUserLoanIncentive = (network: SDKNetwork, token: Token) => {
  const [user, setUser] = useState<UserIncentivePool | undefined>();
  const incentive = useIncentive(network);
  const active = useActiveAccount();

  useSubscription(() => {
    if (!incentive || !active) return;

    return incentive.subscribeUserIncentive(`loans-${token.name}`, active.address).subscribe({
      next: setUser,
      error: (e) => {
        console.error(e);
      }
    });
  }, [incentive, active]);

  return user;
};