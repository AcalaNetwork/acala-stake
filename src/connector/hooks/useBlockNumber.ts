import { useState } from "react";
import { useApi } from ".";
import { CONNECTED_NETWORK } from "../../config";
import { useSubscription } from "../../hooks/useSubscription";

export function useBlockNumebr (network?: CONNECTED_NETWORK) {
  const api = useApi(network);
  const [blockNumber, setBlockNumber] = useState<number>();

  useSubscription(() => {
    if (!api?.api) return;

    return api.api.query.system.number().subscribe({ next: (i) => setBlockNumber(Number(i.toString())) });
  }, [api]);

  return blockNumber;
}