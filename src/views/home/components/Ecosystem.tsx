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
  link?: string;
}

const Item = memo<ItemProps>(({ title, desc, icon, link }) => (
  <>
    {link ? (
      <Card className='mb-20 py-28 px-34 text-left leading-[24px]'>
        <a href={link} rel="noreferrer"
          target={'_blank'}>
          <div className='w-64 h-64 flex flex-center'>{icon}</div>
          <div className='mt-24 text-20 text-333 tracking-[1px] font-semibold'>{title}</div>
          <div className='mt-12 text-16 text-4f4f4f font-medium'>{desc}</div>
        </a>
      </Card>
    ) : (
      <Card className='mb-20 py-28 px-34 text-left leading-[24px]'>
        <div className='w-64 h-64 flex flex-center'>{icon}</div>
        <div className='mt-24 text-20 text-333 tracking-[1px] font-semibold'>{title}</div>
        <div className='mt-12 text-16 text-4f4f4f font-medium'>{desc}</div>
      </Card>
    )}
  </>
));

export const Ecosystem = memo(() => {
  const [isAll, setIsAll] = useState<boolean>(false);
  const getAcalaToken = useGetToken('acala');
  const getKaruraToken = useGetToken('karura');

  return (
    <div className='text-center container'>
      <div className='text-[34px] leading-[44px] tracking-[0.04em] text-grey-1 font-bold mb-64'>Ecosystem</div>
      <div className='grid grid-cols-3 gap-x-17 gap-y-32'>
        <Item desc='Trade LDOT with other assets' icon={<AcalaSwap />}
          title='Acala Swap' />
        <Item
          desc='Use LDOT as collateral and earn x%, +  y% from staking DOT'
          icon={<TokenImage size={64} token={getAcalaToken('AUSD')} />}
          link='https://apps.acala.network/vault'
          title='Acala Dollar'
        />
        <Item desc='Trade stable assets efficiently' icon={<AcalaSwap />}
          title='Tapio' />
        <Item desc='Trade LKSM with other assets' icon={<KaruraSwap />}
          title='Karura Swap' />
        <Item
          desc='Use LKSM as collateral and earn x%, +  y% from staking KSM'
          icon={<TokenImage size={64} token={getKaruraToken('AUSD')} />}
          link='https://apps.karura.network/vault'
          title='Karura Dollar'
        />
        <Item
          desc='Mint taiKSM and earn a total of 43% rewards'
          icon={<TokenImage size={64} token={getKaruraToken('TAI')} />}
          link='https://apps.karura.network/earn/loan-staking'
          title='Taiga'
        />
        {isAll && (
          <>
            <Item desc='Trade LDOT with other assets' icon={<AcalaSwap />}
              title='Acala Swap' />
            <Item
              desc='Use LDOT as collateral to borrow aUSD'
              icon={<TokenImage size={64} token={'AUSD'} />}
              title='Acala Dollar'
            />
            <Item desc='Trade stable assets efficiently' icon={<AcalaSwap />}
              title='Tapio' />
            <Item desc='Trade LKSM with other assets' icon={<KaruraSwap />}
              title='Karura Swap' />
            <Item
              desc='Use LKSM as collateral to borrow kUSD'
              icon={<TokenImage size={64} token={'KUSD'} />}
              title='Karura Dollar'
            />
            <Item desc='Trade stable assets efficiently' icon={<TokenImage size={64} token={'TAI'} />}
              title='Taigo' />
          </>
        )}
      </div>
      <Spacing h={20} />
      <Button className=' rounded-[41px] w-[183px] font-normal h-56' onClick={() => setIsAll(!isAll)}
        variant='outline'>
        {isAll ? 'VIEW LESS' : 'VIEW ALL'}
      </Button>
    </div>
  );
});
