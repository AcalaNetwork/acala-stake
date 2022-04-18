import { Button, BaseComponentProps } from '@components';
import clsx from 'clsx';
import { memo } from 'react';

export const UserGuide = memo<BaseComponentProps>(({ className }) => {
  return (
    <div
      className={clsx('flex flex-between rounded-[24px] px-100 py-30', className)}
      style={{ backgroundImage: `url("/images/top-board-bg.svg")` }}
    >
      <div>
        <div className='text-20 leading-[24px] text-2e2d33 font-semibold'>Powered Acala Bridge Service</div>
        <div className='mt-12 text-16 leading-[27px] text-494853 font-medium'>
          Bring cross-chain assets to Acala Network.
        </div>
      </div>
      <div className='flex flex-center gap-20'>
        <Button className='h-[45px] w-[150px]' size='sm'>
          Watch Video
        </Button>
        <Button className='h-[45px] w-[150px]' size='sm'
          variant='outline'>
          User Guide
        </Button>
      </div>
    </div>
  );
});
