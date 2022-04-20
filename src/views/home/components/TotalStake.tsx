import { memo } from 'react';
import { useTotalStakingTVL } from '../../../sdk/hooks/homa';
import { formatNumber } from '../../../utils/formatNumber';

export const TotalStake = memo(() => {
  const totalTVL = useTotalStakingTVL();

  return (
    <div className='flex flex-center flex-col z-1 relative text-fff tracking-[0.02em]'>
      <div className='mt-64 text-24 font-medium opacity-[0.8] leading-29'>The Liquid Staking Protocol</div>
      <div className='mt-12 text-[64px] leading-[78px] font-bold'>$ {formatNumber(totalTVL)}</div>
      <div className='mt-36 text-18 max-w-[701px] font-medium leading-[24px] text-center opacity-[0.8] tracking-[0.04em]'>
        Acala and Karura Liquid Staking are non-custodial staking protocols for earning staking rewards in a simple and
        secure way, while giving you additional liquidity to earn.
      </div>
    </div>
  );
});
