import { FixedPointNumber, Token } from '@acala-network/sdk-core';
import React, { memo } from 'react';
import { Button, LinkButton } from '@components/Button';
import { Card } from '@components/Card';
import { FormatBalance } from '@components/FormatBalance';
import { FormatRatio } from '@components/FormatRatio';
import { NetworkIcon } from '@components/NetworkIcon';
import { Spacing } from '@components/Spacing';
import { useHoma } from '@sdk/hooks/homa';
import { useHomaAPY } from '@sdk/hooks/homa/useHomaAPY';
import { useHomaTotalStaking } from '@sdk/hooks/homa/useHomaTotalStaking';
import { getTokenName } from '@utils/token';

type StakeCardType = 'acala' | 'karura';

export const StakeCard = memo(() => {
  const acalaHoma = useHoma('acala');
  const karuraHoma = useHoma('karura');
  const acalaHomaAPY = useHomaAPY('acala');
  const karuraHomaAPY = useHomaAPY('karura');
  const acalaTotalStaking = useHomaTotalStaking('acala');
  const karuraTotalStaking = useHomaTotalStaking('karura');

  return (
    <div className='gap-100 flex flex-center'>
      <div className='flex-1'>
        <StakeItem
          apy={acalaHomaAPY}
          className='flex-1'
          desc={`Stake ${getTokenName(
            acalaHoma.consts.stakingToken
          )} to receive daily rewards and retain control of your staked ${getTokenName(
            acalaHoma?.consts.stakingToken
          )}s in ${getTokenName(acalaHoma.consts.liquidToken)}.`}
          staked={acalaTotalStaking}
          token={acalaHoma.consts.stakingToken}
          type='acala'
        />
      </div>
      <div className='flex-1'>
        <StakeItem
          apy={karuraHomaAPY}
          className='flex-1'
          desc={`Stake ${getTokenName(
            karuraHoma.consts.stakingToken
          )} to receive daily rewards and retain control of your staked ${getTokenName(
            karuraHoma.consts.stakingToken
          )}s in ${getTokenName(karuraHoma?.consts.liquidToken)}.`}
          staked={karuraTotalStaking}
          token={karuraHoma.consts.stakingToken}
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
  token: Token;
  desc: string;
  staked: FixedPointNumber;
  apy: number;
}

const StakeItem = memo<StakeItemProps>(({ className, type, token, desc, staked, apy }) => {
  return (
    <Card
      className={`w-[566px] h-[454px] flex-1 flex-center flex-col pt-32 pb-30 px-40 bg-opacity-[0.8] shadow-[0px_1px_25px_rgba(100, 90, 255, 0.08)] backdrop-blur-[150px] ${className}`}
    >
      <NetworkIcon type={type === 'acala' ? 'polkadot' : 'kusama'} width={64} />
      <Spacing h={27} />
      <div className='tracking-[0.02em] text-center w-[322px]'>
        <div className='text-20 leading-24 font-semibold '>{type === 'acala' ? 'Polkadot' : 'Kusama'} Staking</div>
        <Spacing h={19} />
        <div className='text-14 leading-21 font-medium text-grey-3'>{desc}</div>
      </div>
      <Spacing h={29} />
      <div className='flex w-full h-99 border border-grey-5 rounded-[24px] py-11 text-28'>
        <div className='flex-1 flex-col flex justify-around items-center border-r border-grey-5'>
          <span className='font-bold leading-34 text-primary'>
            <FormatBalance balance={staked} human />
          </span>
          <span className='mt-8 text-16 leading-20 font-medium text-grey-2 opacity-80'>Staked</span>
        </div>
        <div className='flex-1 flex-col flex justify-around items-center'>
          <div className='relative'>
            <FormatRatio className='font-bold leading-34 text-primary' data={apy} />
            {token.toString() === 'DOT' && (
              <div className='text-acala-pink-500 border border-acala-pink-500 py-2 px-9 leading-[13px] text-[11px] rounded-8 absolute top-0 right-0 transform translate-x-full'>
                BOOST
              </div>
            )}
          </div>
          <span className='text-16 leading-20 font-medium text-grey-2 opacity-80'>Est.APY</span>
          {token.toString() === 'DOT' && (
            <span className='text-acala-pink-500 font-medium text-11 leading-13'>+10% APR ACA airdrop</span>
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
