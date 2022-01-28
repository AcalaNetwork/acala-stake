import { FixedPointNumber, MaybeCurrency } from "@acala-network/sdk-core";
import { PriceProviderType } from "@acala-network/sdk/wallet/price-provider/types";
import { useState } from "react";
import { useWallet } from ".";
import { useSubscription } from "../../../hooks/useSubscription";
import { SDKNetwork } from "../../types";

export function usePrice (network: SDKNetwork, token: MaybeCurrency, type = PriceProviderType.MARKET) {
  const [price, setPrice] = useState<FixedPointNumber>(FixedPointNumber.ZERO);
  const wallet = useWallet(network);

  useSubscription(() => {
    if (!wallet) return;

    return wallet.subscribePrice(token, type).subscribe({
      next: (value) => {
        value && setPrice(value)
      }
    })
  }, [wallet])

  return price;
}