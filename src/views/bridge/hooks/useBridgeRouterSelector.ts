import { Token } from '@acala-network/sdk-core';
import { Chain } from '@acala-network/sdk/cross-chain/types';
import { ChainData } from '@components';
import { useCrossChain } from '@sdk/hooks/crosschain/useCrossChain';
import { SDKNetwork } from '@sdk/types';
import { useRef } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface Configs {
  token: Token;
  to: SDKNetwork;
}

function transformChain (chain: Chain): ChainData {
  return {
    value: chain.id,
    display: chain.display
  };
}

interface RouterData {
  fromChains?: Chain[];
  toChains?: Chain[];
  toChain?: Chain;
  fromChain?: Chain;
}

export const useBridgeRouter = ({ token, to }: Configs) => {
  const crossChain = useCrossChain();
  const dataRef = useRef<RouterData>();
  const [fromChain, setFromChain] = useState<Chain | undefined>();
  const [toChain, setToChain] = useState<Chain | undefined>();
  const [fromChains, setFromChains] = useState<Chain[]>([]);
  const [toChains, setToChains] = useState<Chain[]>([]);

  const router = crossChain.router;

  const updater = useCallback((data: RouterData) => {
    dataRef.current = data;

    if (data.fromChains) setFromChains(data.fromChains);
    if (data.fromChain) setFromChain(data.fromChain);
    if (data.toChains) setToChains(data.toChains);
    if (data.toChain) setToChain(data.toChain);
  }, []);

  const onFromChainChange = useCallback((chain: string) => {
    const selected = fromChains.find(i => i.id === chain);

    setFromChain(selected);
  }, [fromChains]);

  const onToChainChange = useCallback((chain: string) => {
    const selected = toChains.find(i => i.id === chain);

    setToChain(selected);
  }, [toChains]);

  const onToggle = useCallback(() => {
    const old = { ...dataRef.current };

    updater({
      fromChain: old?.toChain,
      toChain: old?.fromChain,
      fromChains: old?.toChains,
      toChains: old?.fromChains
    });
  }, [updater]);

  useEffect(() => {
    const firstRouter = router.getRouters({ token: token.symbol, to })[0];
    const fromChains = router.getFromChains({ to, token: token.symbol  });
    const toChains = router.getDestiantionsChains({ from: firstRouter.from, token: token.symbol  });
    const toChain = firstRouter.to;
    const fromChain = firstRouter.from;

    updater({
      fromChain,
      toChain,
      fromChains,
      toChains
    });
  }, [router, token.symbol, updater, to]);

  return useMemo(() => ({
    fromChains: fromChains.map(transformChain),
    toChains: toChains.map(transformChain),
    fromChain: fromChain?.id,
    toChain: toChain?.id,
    onToggle,
    onFromChainChange,
    onToChainChange
  }), [fromChains, toChains, fromChain?.id, toChain?.id, onToggle, onFromChainChange, onToChainChange]);
};

export type BridgeRouter = ReturnType<typeof useBridgeRouter>;
