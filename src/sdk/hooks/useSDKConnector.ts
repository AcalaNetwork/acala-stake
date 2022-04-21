import { ApiRx } from '@polkadot/api';
import { Wallet } from '@acala-network/sdk/wallet';
import { SwapRx } from '@acala-network/sdk-swap';
import { useEffect, useMemo, useState } from 'react';
import { Homa, Liquidity } from '@acala-network/sdk';
import { History } from '@acala-network/sdk/history';
import { SDKNetwork } from '@sdk/types';

export const useSDKConnector = (api?: ApiRx, network?: SDKNetwork) => {
  const [wallet, setWallet] = useState<Wallet>();
  const [swap, setSwap] = useState<SwapRx>();
  const [liquidity, setLiquidity] = useState<Liquidity>();
  const [homa, setHoma] = useState<Homa>();
  const [history, setHistory] = useState<History>();

  const init = useMemo(
    () => async (api: ApiRx) => {
      await api.isConnected;

      const wallet = new Wallet(api);
      const swap = new SwapRx(api);
      const history = new History({
        poolInterval: 10000,
        wallet: wallet,
        fetchEndpoints: {
          transfer: '',
          homa: `https://api.subquery.network/sq/AcalaNetwork/${network === 'acala' ? 'acala': 'karura'}-homa`,
          swap: '',
          earn: '',
          loan: '',
        }
      });

      setWallet(wallet);
      setSwap(swap);
      setLiquidity(wallet.liquidity);
      setHoma(wallet.homa);
      setHistory(history);
    },
    [setWallet, setSwap, setLiquidity]
  );

  useEffect(() => {
    if (!api) return;

    init(api);
  }, [api, init]);

  return { wallet, swap, liquidity, homa, history };
};
