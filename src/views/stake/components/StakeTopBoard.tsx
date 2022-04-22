import { memo } from 'react';
import { FormatBalance } from '@components/FormatBalance';
import { FormatValue } from '@components/FormatValue';
import { TokenImage } from '@components/TokenImage';
import { TopBoard } from '@components/TopBoard';
import { useTotalStaking } from '../hook/useTotalStaking';
import { SDKNetwork } from '@sdk/types';
import { getTokenName } from '@utils';

export const StakeTopBoard = memo<{ network: SDKNetwork }>(({ network }) => {
  const data = useTotalStaking(network);

  return (
    <TopBoard>
      <div className='flex h-[126px] flex-between items-center py-30 text-24 leading-29 font-semibold'>
        {
          data && (
            <>
              <div className='text-grey-2'>Stake {getTokenName(data.token)}</div>
              <div className='flex'>
                <TokenImage className='mr-32' size={64}
                  token={data.token} />
                <div className='flex flex-col gap-12'>
                  <div className='flex justify-start items-center gap-12 text-grey-1'>
                    <FormatBalance balance={data.amount} human />
                    {getTokenName(data.token)}
                  </div>
                  <div className='text-20 text-grey-3 font-medium'>
                    <FormatValue data={data.value} />
                  </div>
                </div>
              </div>
            </>
          )
        }
      </div>
    </TopBoard>
  );
});
