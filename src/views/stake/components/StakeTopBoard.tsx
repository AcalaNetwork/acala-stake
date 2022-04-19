import { memo } from 'react';
import { FormatBalance } from '@components/FormatBalance';
import { FormatValue } from '@components/FormatValue';
import { TokenImage } from '@components/TokenImage';
import { TopBoard } from '@components/TopBoard';
import { useTotalStaking } from '../hook/useTotalStaking';
import { SDKNetwork } from '@sdk/types';

export const StakeTopBoard = memo<{ network: SDKNetwork }>(({ network }) => {
  const data = useTotalStaking(network);

  if (!data) return null;

  const { amount, value, token } = data;

  return (
    <TopBoard>
      <div className='flex flex-between items-center py-30 text-24 leading-29 font-semibold'>
        <div className='text-grey-2'>Stake {token.display}</div>
        <div className='flex'>
          <TokenImage className='mr-32' size={64} token={token} />
          <div className='flex flex-col gap-12'>
            <div className='flex justify-start items-center gap-12 text-grey-1'>
              <FormatBalance balance={amount} human />
              <span>{token.symbol}</span>
            </div>
            <div className='text-20 text-grey-3 font-medium'>
              <FormatValue data={value} />
            </div>
          </div>
        </div>
      </div>
    </TopBoard>
  );
});
