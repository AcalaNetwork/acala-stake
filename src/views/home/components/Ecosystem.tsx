import { memo, ReactNode } from 'react';
import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Spacing } from '@components/Spacing';
import AcalaSwap from '/public/pages/express/acala-swap.svg';
import KaruraSwap from '/public/pages/express/karura-swap.svg';
import { TokenImage } from '@components/TokenImage';
import { useState } from 'react';
import { useGetToken } from '@sdk';

interface ItemProps {
  title: string;
  desc: string;
  icon: ReactNode;
}

const Item = memo<ItemProps>(({ title, desc, icon }) => {
  return (
    <Card className='mb-20 py-28 px-34 text-left leading-[24px]'>
      <div className='w-64 h-64 flex flex-center'>{icon}</div>
      <div className='mt-24 text-20 text-333 tracking-[1px] font-semibold'>{title}</div>
      <div className='mt-12 text-16 text-4f4f4f font-medium'>{desc}</div>
    </Card>
  );
});

export const Ecosystem = memo(() => {
  const [isAll, setIsAll] = useState<boolean>(false);
  const getAcalaToken = useGetToken('acala');
  const getKaruraToken = useGetToken('karura');

  return (
    <div className='text-center container'>
      <div className='text-[34px] leading-[44px] tracking-[0.04em] text-2e2d33 font-bold mb-64'>Ecosystem</div>
      <div className='grid grid-cols-3 gap-x-20 gap-y-32'>
        <Item desc='Trade LDOT with other assets' icon={<AcalaSwap />} title='Acala Swap' />
        <Item
          desc='Use LDOT as collateral to borrow aUSD'
          icon={<TokenImage size={64} token={getAcalaToken('AUSD')} />}
          title='Acala Dollar'
        />
        <Item desc='Trade stable assets efficiently' icon={<AcalaSwap />} title='Tapio' />
        <Item desc='Trade LKSM with other assets' icon={<KaruraSwap />} title='Karura Swap' />
        <Item
          desc='Use LKSM as collateral to borrow aUSD'
          icon={<TokenImage size={64} token={getKaruraToken('AUSD')} />}
          title='Karura Dollar'
        />
        <Item
          desc='Trade stable assets efficiently'
          icon={<TokenImage size={64} token={getKaruraToken('TAI')} />}
          title='Taigo'
        />
        {isAll && (
          <>
            <Item desc='Trade LDOT with other assets' icon={<AcalaSwap />} title='Acala Swap' />
            <Item
              desc='Use LDOT as collateral to borrow aUSD'
              icon={<TokenImage size={64} token={'AUSD'} />}
              title='Acala Dollar'
            />
            <Item desc='Trade stable assets efficiently' icon={<AcalaSwap />} title='Tapio' />
            <Item desc='Trade LKSM with other assets' icon={<KaruraSwap />} title='Karura Swap' />
            <Item
              desc='Use LKSM as collateral to borrow kUSD'
              icon={<TokenImage size={64} token={'KUSD'} />}
              title='Karura Dollar'
            />
            <Item desc='Trade stable assets efficiently' icon={<TokenImage size={64} token={'TAI'} />} title='Taigo' />
          </>
        )}
      </div>
      <Spacing h={20} />
      <Button className=' rounded-[41px] w-[183px] font-normal h-56' onClick={() => setIsAll(!isAll)} variant='outline'>
        {isAll ? 'VIEW LESS' : 'VIEW ALL'}
      </Button>
    </div>
  );
});
