import Link from 'next/link';
import { memo } from 'react';
import { Button } from '@components/Button';
import { Card } from '@components/Card';

import Success from '/public/images/result-success.svg';
import { useUnstake } from './UnstakeProvider';

export const UnstakeComplated = memo(() => {
  const { network } = useUnstake();
  return (
    <>
      <Card className='w-[630px] px-55 py-32 mx-auto flex flex-center flex-col' shadow={'none'}>
        <Success />
        <div className='mt-34 text-24 leading-24 font-semibold'>Transaction Completed</div>
        <div className='flex gap-40 mt-24'>
          <Button className='pt-0 font-normal' variant='text'>
            See Unstake Transaction
          </Button>
        </div>
        <div className='mt-40'>
          <Button className='h-48 w-[200px]' size='sm'>
            <Link href={`/stake/${network}/user`}>My Stakes</Link>
          </Button>
        </div>
      </Card>
    </>
  );
});
