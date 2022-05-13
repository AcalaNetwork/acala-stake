import { FixedPointNumber, Token } from '@acala-network/sdk-core';
import React, { memo } from 'react';
import { Button, LinkButton } from '@components/Button';
import { Card } from '@components/Card';
import { FormatRatio } from '@components/FormatRatio';
import { Spacing } from '@components/Spacing';
import { useHoma } from '@sdk/hooks/homa';
import { useHomaAPY } from '@sdk/hooks/homa/useHomaAPY';
import { useHomaTotalStaking } from '@sdk/hooks/homa/useHomaTotalStaking';
import { getTokenName } from '@utils/token';
import KusamaPink from '/public/network/kusama-pink.svg';
import PolkadotPink from '/public/network/polkadot-pink.svg';
import { useLiquidTokenIncentivePool } from '@sdk';
import { format, formatNumber } from '@utils';

type StakeCardType = 'acala' | 'karura';

export const StakeCard = memo(() => {
  const acalaHoma = useHoma('acala');
  const karuraHoma = useHoma('karura');
  const acalaHomaAPY = useHomaAPY('acala');
  const karuraHomaAPY = useHomaAPY('karura');
  const acalaTotalStaking = useHomaTotalStaking('acala');
  const karuraTotalStaking = useHomaTotalStaking('karura');
  const karuraIncentive = useLiquidTokenIncentivePool('karura');
  const acalaIncentive = useLiquidTokenIncentivePool('acala');

  return (
    <div className='flex flex-center justify-between'>
      <div className='flex-1'>
        <StakeItem
          className='flex-1'
          desc={`Stake ${getTokenName(
            acalaHoma.consts.stakingToken
          )} to receive daily rewards and retain control of your staked ${getTokenName(
            acalaHoma?.consts.stakingToken
          )}s in ${getTokenName(acalaHoma.consts.liquidToken)}.`}
          homaAPY={acalaHomaAPY}
          incentiveAPR={acalaIncentive?.apr?.apr}
          incentiveRewardsTokens={acalaIncentive?.rewardTokensConfig.map(i => i.token)}
          staked={acalaTotalStaking}
          type='acala'
        />
      </div>
      <div className='flex-1'>
        <StakeItem
          className='flex-1'
          desc={`Stake ${getTokenName(
            karuraHoma.consts.stakingToken
          )} to receive daily rewards and retain control of your staked ${getTokenName(
            karuraHoma.consts.stakingToken
          )}s in ${getTokenName(karuraHoma?.consts.liquidToken)}.`}
          homaAPY={karuraHomaAPY}
          incentiveAPR={karuraIncentive?.apr?.apr}
          incentiveRewardsTokens={karuraIncentive?.rewardTokensConfig.map(i => i.token)}
          staked={karuraTotalStaking}
          type='karura'
        />
      </div>
    </div>
  );
});

export const NumIcon = memo<{ cardNum: number }>(({ cardNum }) => (
  <div className='flex-center w-48 h-48 rounded-full bg-gradient-primary-light'>
    <div className='flex-center bg-white h-44 w-44 rounded-full'>
      <div className='absolute flex-center w-38 h-38 bg-gradient-light rounded-full'></div>
      <div className='text-20 text-transparent bg-clip-text bg-gradient-to-br from-acala-orange-500 via-acala-pink-500 to-acala-blue-500 font-sans font-semibold'>
        {cardNum}
      </div>
    </div>
  </div>
));

interface StakeItemProps {
  type: StakeCardType;
  className?: string;
  desc: string;
  staked: FixedPointNumber;
  homaAPY: number;
  incentiveAPR: number;
  incentiveRewardsTokens: Token[]
}

const StakeItem = memo<StakeItemProps>(({ className, type, desc, staked, homaAPY, incentiveAPR, incentiveRewardsTokens }) => {
  return (
    <Card
      className={`w-[566px] h-[454px] flex-1 flex-center flex-col pt-32 pb-30 px-40 bg-opacity-[0.8] shadow-[0px_1px_25px_rgba(100, 90, 255, 0.08)] backdrop-blur-[150px] ${className}`}
      round='sm'
    >
      {type === 'acala' ? <PolkadotPink width={64} /> : <KusamaPink width={64} />}
      <div className='tracking-[0.02em] text-center w-[322px] mt-27'>
        <div className='text-20 leading-24 font-semibold '>{type === 'acala' ? 'Polkadot' : 'Kusama'} Staking</div>
        <div className='mt-19 text-14 leading-21 font-medium text-grey-3'>{desc}</div>
      </div>
      <div className='mt-29 flex w-full h-99 border border-grey-5 rounded-[24px] py-11 text-28'>
        <div className='flex-1 flex-col flex justify-around items-center border-r border-grey-5'>
          <span className='font-bold leading-34 text-primary'>
            {format(staked.toString(), 0)}
          </span>
          <span className='mt-8 text-16 leading-20 font-medium text-grey-2 opacity-80'>Staked</span>
        </div>
        <div className='flex-1 flex-col flex justify-around items-center'>
          <div className='relative'>
            <FormatRatio className='font-bold leading-34 text-primary' data={homaAPY} />
            { !!incentiveAPR && (
              <div className='text-acala-pink-500 border border-acala-pink-500 py-2 px-4 leading-6 text-6 rounded-8 absolute -top-4 -right-4 transform translate-x-full'>
                  BOOST
              </div>
            )
            }
          </div>
          <span className='text-16 leading-20 font-medium text-grey-2 opacity-80'>Est.APY</span>
          { !!incentiveAPR && (
            <span className='text-acala-pink-500 font-medium text-11 leading-13'>
              +
              <FormatRatio data={incentiveAPR} />
              {' '}APR{' '}
              {incentiveRewardsTokens?.map(i => getTokenName(i)).join(',')}{' '}
              airdrop
            </span>
          )}
        </div>
      </div>
      <Spacing h={40} />
      <div className='flex w-full justify-around'>
        <Button className='font-normal w-[180px] h-44 pt-0 pb-0' variant='outline'>
          Learn More
        </Button>
        <LinkButton className='font-normal w-[180px] h-44 pt-0 pb-0' href={`/stake/${type}`}>
          {"Let's Go"}
        </LinkButton>
      </div>
    </Card>
  );
});
