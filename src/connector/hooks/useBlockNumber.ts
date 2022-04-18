import { ConnectedNetworks } from 'config';
import { useState } from 'react';
import { useApi } from '.';
import { useSubscription } from '../../hooks/useSubscription';

export function useBlockNumebr(network?: ConnectedNetworks) {
  const api = useApi(network);
  const [blockNumber, setBlockNumber] = useState<number>();

  useSubscription(() => {
    if (!api?.api) return;

    return api.api.query.system.number().subscribe({ next: (i) => setBlockNumber(Number(i.toString())) });
  }, [api]);

  return blockNumber;
}
