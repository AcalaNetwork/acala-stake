import { UserLiquidity } from '@acala-network/sdk/liquidity/types';
import { useState } from 'react';
import { useLiquidity } from '.';
import { useActiveAccount } from '../../../connector';
import { useSubscription } from '../../../hooks/useSubscription';
import { switchMap, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { useWallet } from '..';
import next from 'next';
import { FixedPointNumber } from '@acala-network/sdk-core';

export const useLiquidityOverviewOfUser = () => {
  const active = useActiveAccount();
  const liquidity = useLiquidity();
  const [data, setData] = useState<Record<string, UserLiquidity>>();

  useSubscription(() => {
    if (!liquidity) return;

    if (!active) return;
    return liquidity.subscribeAllUserLiquidityDetails(active.address).subscribe({
      next: setData,
    });
  }, [active, liquidity]);

  return data;
};

// liquidity.subscribeAllUserPools(active.address).pipe(
//   switchMap((data) => {
//     return combineLatest(Object.entries((Object.entries(data).map(([key, item])) => {
//       return [key, wallet.subscirbePrice(item.token)]
//     }))).pipe(
//       map((prices) = )
//     )
//   }).subscribe ({
//     next: xxxx
//   })
// )

export const useLiquidityValue = () => {
  const wallet = useWallet();
  const active = useActiveAccount();
  const liquidity = useLiquidity();
  const [data, setData] = useState<Record<string, FixedPointNumber>>();
  const [tokens, setTokens] = useState<string[]>([]);

  useSubscription(() => {
    if (!liquidity || !active || !wallet) return;

    return liquidity
      .subscribeAllUserLiquidityDetails(active.address)
      .pipe(
        switchMap((data) => {
          const _tokens = [];
          Object.keys(data).forEach((key) => tokens.push(key));
          setTokens(_tokens);
          return combineLatest(
            Object.entries(data).map(([key, item]) => {
              return wallet.subscribePrice(key);
            })
          ).pipe(
            map((data) => {
              const prices: Record<string, FixedPointNumber> = {};
              data.forEach((price, index) => {
                prices[tokens[index]] = price ?? FixedPointNumber.ZERO;
              });
              return prices;
            })
          );
        })
      )
      .subscribe({
        next: setData,
      });
  }, [active, liquidity, wallet]);

  return data;
};
