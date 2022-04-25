import { ApiRx } from '@polkadot/api';
import { Wallet } from '@acala-network/sdk/wallet';
import { SwapRx } from '@acala-network/sdk-swap';
import { useEffect, useMemo, useState } from 'react';
import { Homa, Incentive, Liquidity } from '@acala-network/sdk';

export const useSDKConnector = (api?: ApiRx) => {
  const [wallet, setWallet] = useState<Wallet>();
  const [swap, setSwap] = useState<SwapRx>();
  const [liquidity, setLiquidity] = useState<Liquidity>();
  const [homa, setHoma] = useState<Homa>();
  const [incentive, setIncentive] = useState<Incentive>();

  const init = useMemo(
    () => async (api: ApiRx) => {
      await api.isConnected;

      const wallet = new Wallet(api);
      const swap = new SwapRx(api);
      const incentive = new Incentive(api, wallet);

      setWallet(wallet);
      setSwap(swap);
      setLiquidity(wallet.liquidity);
      setHoma(wallet.homa);
      setIncentive(incentive);
    },
    [setWallet, setSwap, setLiquidity, setIncentive]
  );

  useEffect(() => {
    if (!api) return;

    init(api);
  }, [api, init]);

  return useMemo(() => ({ wallet, swap, liquidity, homa, incentive }), [homa, incentive, liquidity, swap, wallet]);
};
