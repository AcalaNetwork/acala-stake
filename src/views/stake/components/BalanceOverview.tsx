import { memo } from 'react';
import { Card } from '@components/Card';
import { FormatBalance } from '@components/FormatBalance';
import { FormatRatio } from '@components/FormatRatio';
import { TokenName } from '@components/TokenName';
import { useBalanceOverview } from '../hook/useBalanceOverview';
import { SDKNetwork } from '@sdk/types';
import clsx from 'clsx';
import { useLiquidTokenIncentivePool } from '@sdk';
import { getTokenName } from '@utils';

export const BalanceOverview = memo<{ network: SDKNetwork; className?: string }>(({ className, network }) => {
  const { stakingBalance, liquidBalance, apy, liquidToken, stakingToken } = useBalanceOverview(network);
  const incentive = useLiquidTokenIncentivePool(network);

  return (
    <Card className={clsx('flex flex-between h-[150px] px-[119px] text-grey-3', className)} variant='gradient-border'>
      <div>
        <div className='text-14 leading-17 mb-8'>Available to Stake</div>
        <div className='flex gap-10 text-28 leading-34 text-grey-1 font-semibold'>
          <FormatBalance balance={stakingBalance} human /> <TokenName token={stakingToken} />
        </div>
      </div>
      <div>
        <div className='text-14 leading-17 mb-8'>Staked Amount</div>
        <div className='flex gap-10 text-28 leading-34 text-grey-1 font-semibold'>
          <FormatBalance balance={liquidBalance} human /> <TokenName token={liquidToken} />
        </div>
      </div>
      <div className='flex flex-col justify-start items-center'>
        <div className='text-14 leading-17 mb-8'>Current APY</div>
        <div className='flex flex-col items-center gap-y-10'>
          <span>
            Est{' '}
            <span className='text-primary font-semibold text-24'>
              <FormatRatio data={apy} />
            </span>
          </span>
          { !!incentive?.apr?.apr && (
            <span className='text-acala-pink-500'>
              +
              <FormatRatio data={incentive.apr.apr} />
              {' '}APR{' '}
              {incentive.rewardTokensConfig?.map(i => getTokenName(i.token)).join(',')}{' '}
              airdrop
            </span>
          )}
        </div>
      </div>
    </Card>
  );
});
