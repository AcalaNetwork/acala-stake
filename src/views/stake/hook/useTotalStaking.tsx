import { useSubscription } from "../../../hooks/useSubscription";
import { useWallet } from "../../../sdk";
import { useHomaTotalStaking } from "../../../sdk/hooks/homa/useHomaTotalStaking";
import { useMemo, useState } from "react";
import { FixedPointNumber } from "@acala-network/sdk-core";

export const useTotalStaking = (token: "DOT" | "KSM") => {
  const network = useMemo(() => token === "KSM" ? "karura" : "acala", [token]);
  const totalStaking = useHomaTotalStaking(network);
  const wallet = useWallet(network);

  const [result, setResult] = useState<{
    amount?: FixedPointNumber;
    value?: FixedPointNumber;
  }>({});

  useSubscription(() => {
    if (!totalStaking || !wallet || !wallet.isReady) return;

    return wallet.subscribePrice(token).subscribe({
      next: (price) => {
        setResult({
          amount: totalStaking,
          value: totalStaking.mul(price ?? FixedPointNumber.ZERO),
        });
      },
    });
  }, [wallet, totalStaking, totalStaking, token]);

  return result;
};
