import { BaseSDK } from '@acala-network/sdk/types';
import React, { FC, ReactElement, useMemo } from 'react';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { useIncentive, useWallet } from '..';
import { PageLoading } from '../../components/PageLoading';
import { useBoolean, useMemoized } from '../../hooks';
import { useSubscription } from '../../hooks/useSubscription';
import { useLiquidity } from '../hooks/liquidity';
import { useHoma } from '../hooks/homa/useHoma';
import { useCrossChain } from '@sdk/hooks/crosschain/useCrossChain';

type SDKType =
  | 'crosschain'
  | 'acala-wallet'
  | 'acala-liquidity'
  | 'acala-incentive'
  | 'acala-homa'
  | 'karura-wallet'
  | 'karura-liquidity'
  | 'karura-homa'
  | 'karura-incentive';
interface EnsureSDKProps {
  requires: SDKType[];
  loading?: ReactElement;
}

const subscribeRequiredSDKReadyStatus = (sdks: Partial<Record<SDKType, BaseSDK>>) => {
  if (Object.values(sdks).filter((i) => !!i).length !== Object.values(sdks).length) return false;

  return (requires: SDKType[]) => {
    return combineLatest(
      Object.fromEntries(
        requires.map((name) => {
          return [name as string, sdks[name]?.isReady$];
        })
      )
    ).pipe(map((result) => Object.values(result).filter((item) => !item).length === 0));
  };
};

export const EnsureSDKReady: FC<EnsureSDKProps> = React.memo(({ requires, children, loading }) => {
  const memoRequireds = useMemoized(requires);
  const { value: isReady, update: updateIsReady } = useBoolean();
  // acala sdk
  const acalaWallet = useWallet('acala');
  const acalaLiquidity = useLiquidity('acala');
  const acalaHoma = useHoma('acala');
  const acalaIncentive = useIncentive('acala');
  // karura sdk
  const karuraWallet = useWallet('karura');
  const karuraLiquidity = useLiquidity('karura');
  const karuraHoma = useHoma('karura');
  const karuraIncentive = useIncentive('karura');
  // crosschain
  const crossChian = useCrossChain();

  const subscribeReadyStatus = useMemo(() => {
    return subscribeRequiredSDKReadyStatus({
      crosschain: crossChian,
      'acala-wallet': acalaWallet,
      'acala-homa': acalaHoma,
      'acala-liquidity': acalaLiquidity,
      'acala-incentive': acalaIncentive,
      'karura-wallet': karuraWallet,
      'karura-homa': karuraHoma,
      'karura-liquidity': karuraLiquidity,
      'karura-incentive': karuraIncentive,
    });
  }, [crossChian, acalaWallet, acalaHoma, acalaLiquidity, acalaIncentive, karuraWallet, karuraHoma, karuraLiquidity, karuraIncentive]);

  useSubscription(() => {
    if (!subscribeReadyStatus) return;

    return subscribeReadyStatus(memoRequireds).subscribe({
      next: updateIsReady,
    });
  }, [subscribeReadyStatus, memoRequireds]);

  if (!isReady) return loading !== undefined ? loading : <PageLoading />;

  return <>{children}</>;
});
