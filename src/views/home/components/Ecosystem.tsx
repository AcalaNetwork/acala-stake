import { memo, ReactNode } from 'react';
import { Card } from '@components/Card';
import AcalaSwap from '/public/pages/express/acala-swap.svg';
import KaruraSwap from '/public/pages/express/karura-swap.svg';
import { TokenImage } from '@components/TokenImage';
import { useGetToken, usePresetTokens } from '@sdk';
import { useAPY } from '@views/stake/hook/useAPY';
import { formatRatio } from '@utils/formatRatio';

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
  const getAcalaToken = useGetToken('acala');
  const getKaruraToken = useGetToken('karura');
  const { liquidToken: KliquidToken} = usePresetTokens('karura');
  const { liquidToken: AliquidToken} = usePresetTokens('acala');
  const { apy: aAPY, rewardApy: aRewardApy } = useAPY('acala', AliquidToken);
  const { apy: kAPY, rewardApy: kRewardApy } = useAPY('karura', KliquidToken);
  return (
    <div className='text-center container'>
      <div className='text-[34px] leading-[44px] tracking-[0.04em] text-grey-1 font-bold mb-64'>Ecosystem</div>
      <div className='grid grid-cols-3 gap-x-17 gap-y-32'>
        <Item desc='Trade LDOT with other assets' icon={<AcalaSwap />}
          title='Acala Swap' />
        <Item
          desc={`Use LDOT as collateral and earn ${formatRatio(aAPY)}, +  ${formatRatio(aRewardApy)} from staking DOT`}
          icon={<TokenImage size={64} token={getAcalaToken('AUSD')} />}
          link='https://apps.acala.network/vault'
          title='Acala Dollar'
        />
        <Item desc='Mint tDOT and earn additional rewards' icon={<AcalaSwap />}
          link="https://apps.acala.network/earn/loan-staking"
          title='Tapio' />
        <Item desc='Trade LKSM with other assets' icon={<KaruraSwap />}
          title='Karura Swap' />
        <Item
          desc={`Use LKSM as collateral and earn ${formatRatio(kAPY)}, +  ${formatRatio(kRewardApy)} from staking KSM`}
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
      </div>
      {/* <Spacing h={20} />
      <Button className=' rounded-[41px] w-[183px] font-normal h-56' onClick={() => setIsAll(!isAll)}
        variant='outline'>
        {isAll ? 'VIEW LESS' : 'VIEW ALL'}
      </Button> */}
    </div>
  );
});
