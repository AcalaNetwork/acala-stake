import { useCallback, useEffect, useState } from "react";
import { CrossChain, AcalaAdaptor, KaruraAdaptor, KusamaAdapter, PolkadotAdapter } from "@acala-network/sdk/cross-chain";
import { AnyApi } from "@acala-network/sdk-core";
import { Wallet } from "@acala-network/sdk";

export interface UseCrossChainSDKConnectorConfigs {
  acalaApi: AnyApi;
  karuraApi: AnyApi;
  polkadotApi: AnyApi;
  kusamaApi: AnyApi;
  acalaWallet: Wallet;
  karuraWallet: Wallet;
}

export const useCrossChainSDKConnector = (configs: UseCrossChainSDKConnectorConfigs) => {
  const { acalaApi, polkadotApi, karuraApi, kusamaApi, acalaWallet, karuraWallet } = configs;

  const [crossChain, setCrossChain] = useState<CrossChain>();

  const connector = useCallback(async () => {
    if (!acalaApi || !polkadotApi || !karuraApi || !kusamaApi) return;

    const sdk = new CrossChain({
      adapters: [
        new AcalaAdaptor({ wallet: acalaWallet, api: acalaApi }),
        new KaruraAdaptor({ wallet: karuraWallet, api: karuraApi }),
        new PolkadotAdapter({ api: polkadotApi }),
        new KusamaAdapter({ api: kusamaApi }),
      ]
    });

    setCrossChain(sdk);
  }, [acalaApi, acalaWallet, karuraApi, karuraWallet, kusamaApi, polkadotApi]);

  useEffect(() => {
    connector();
  }, [connector]);

  return crossChain;
};