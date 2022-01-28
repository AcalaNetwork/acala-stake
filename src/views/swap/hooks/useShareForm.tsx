import { FixedPointNumber } from "@acala-network/sdk-core";
import { useEffect, useState } from "react";
import { useLiquidityOverviewOfUser, useLiquidityValue } from "../../../sdk/hooks/liquidity/useUserLiquidities";

interface PoolProps {
  id: number;
  token: string;
  cur?: string;
  share: string;
  ratio: string;
  reward: string;
  value?: string;
}

export const useShareForm = () => {
  const userAllPools = useLiquidityOverviewOfUser();
  const prices = useLiquidityValue();
  const [pools, setPools] = useState<PoolProps[]>([]);
  const [total, setTotal] = useState<number>();

  useEffect(() => {
    if(!userAllPools || !prices) return;

    const _pools: PoolProps[] = [];
    let _total = new FixedPointNumber(0);

    Object.keys(userAllPools).forEach((key, i) => {
      _total = userAllPools[key].share.times(prices[key])
      _pools.push({
        id: i,
        token: key,
        cur: 'null',
        share: userAllPools[key].share.toString(),
        ratio: userAllPools[key].ratio.times(new FixedPointNumber(100)).toString(),
        reward: 'null',
        value: userAllPools[key].share.times(prices[key]).toString()
      })
    });
    setPools(_pools);
    setTotal(_total.toNumber());
  }, [userAllPools, prices]);

  return [total, pools] as const;
};