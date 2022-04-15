import { Chain } from "@acala-network/sdk/cross-chain/types";
import { useCrossChain } from "@sdk/hooks/crosschain/useCrossChian";
import { ConnectedNetworks } from "config";
import { useCallback, useEffect, useState } from "react";

interface Configs {
  token: string;
}

export const useCrossChainRouterSelector = ({ token }: Configs) => {
  const crossChain = useCrossChain();
  const [fromChain, setFromChain] = useState<ConnectedNetworks>();
  const [toChain, setToChain] = useState<ConnectedNetworks>();
  const [fromChains, setFromChains] = useState<ConnectedNetworks[]>([]);
  const [toChains, setToChains] = useState<ConnectedNetworks[]>([]);

  const router = crossChain.router;

  const onFromChainChange = useCallback((chain: string) => {

  }, []);

  const onToChainChange = useCallback((chain: string) => {

  }, []);

  // const router = useMemo(() => {
  //   const fromChains = router.getFromChains();

  // }, [router, fromChain, toChain]);
  useEffect(() => {
  }, [fromChains]);

  return {
    fromChains,
    toChains,
    fromChain,
    toChain
  };
};