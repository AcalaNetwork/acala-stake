import { ApiRx } from "@polkadot/api";
import { Wallet } from "@acala-network/sdk/wallet";
import { SwapRx } from "@acala-network/sdk-swap";
import { useEffect, useMemo, useState } from "react";
import { Homa, Liquidity } from "@acala-network/sdk";

export const useSDKConnector = (api?: ApiRx) => {
  const [wallet, setWallet] = useState<Wallet>();
  const [swap, setSwap] = useState<SwapRx>();
  const [liquidity, setLiquidity] = useState<Liquidity>();
  const [homa, setHoma] = useState<Homa>();

  const init = useMemo(() => async (api: ApiRx) => {
    await api.isConnected;

    const wallet = new Wallet(api);
    const swap = new SwapRx(api);
    

    setWallet(wallet);
    setSwap(swap);
    setLiquidity(wallet.liquidity);
    setHoma(wallet.homa);
  }, [setWallet, setSwap, setLiquidity]);

  useEffect(() => {
    if (!api) return;

    init(api);
  }, [api, init]);

  return { wallet, swap, liquidity, homa };
};