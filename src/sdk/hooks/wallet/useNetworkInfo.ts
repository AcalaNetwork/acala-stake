import { SDKNetwork } from "@sdk/types";
import configs from "config";
import { useMemo } from "react";

function findNetwork (network: SDKNetwork) {
  return configs.apis[network];
}

function findParaChain (network: SDKNetwork) {
  const networkConfigs = configs.apis[network];

  return Object.values(configs.apis).find((i) => i.network === networkConfigs.parachian);
}

export const useNetworkInfos = (network: SDKNetwork) => useMemo(() => ({
  network: findNetwork(network),
  parachain: findParaChain(network)
}), [network]);