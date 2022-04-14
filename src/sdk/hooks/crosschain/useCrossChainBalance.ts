import { FixedPointNumber } from "@acala-network/sdk-core";
import { useActiveAccount } from "@connector";
import { useSubscription } from "@hooks/useSubscription";
import { ConnectedNetworks } from "config";
import { useState } from "react";
import { useCrossChain } from "./useCrossChian";

export const useCrossChainBalance = (network: ConnectedNetworks, token: string) => {
  const crossChain = useCrossChain();
  const adapter = crossChain.getAdapter(network);
  const active = useActiveAccount();

  const [balance, setBalance] = useState<FixedPointNumber>();

  useSubscription(() => {
    if (!adapter || !active.address) return;

    return adapter.subscribeAvailableBalance(token, active.address).subscribe({ next: setBalance });
  }, [adapter]);

  return balance;
};