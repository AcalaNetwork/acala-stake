import { forceToCurrencyName } from '@acala-network/sdk-core';
import { BalanceDisplayType } from '@state/application/types';
import Link from 'next/link';
import { FC, memo } from 'react';
import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { TokenImage } from '@components/TokenImage';
import { TokenName } from '@components/TokenName';
import { formatBalance } from '@utils/formatBalance';
import { getTokenFullName } from '@utils/token';
import { StakeData } from '../hook/useStakesCalculator';

interface TokenCardProps extends StakeData {
  type: BalanceDisplayType;
}

export const TokenCard: FC<TokenCardProps> = memo(({ type, token, totalAmount, totalValue, earning, apy, airdrop }) => {
  return (
    <Card className='px-[52px] py-32' variant='gradient-border'>
      <div className='wallet-card-gradient-bg absolute w-full h-full top-0 left-0' />
      <div className='flex items-center'>
        <TokenImage size={52} token={token} />
        <div className='ml-[17px]'>
          <TokenName className='text-20 leading-[24px] text-grey-2 font-semibold' token={token} />
          <div className='text-16 leading-20 font-medium text-grey-3 mt-8'>{getTokenFullName(token)}</div>
        </div>
      </div>
      <div className='mt-24 flex flex-between bg-primary bg-opacity-5 border border-grey-66 rounded-16 h-[105px] px-[50px]'>
        <div className='text-grey-2 flex-1'>
          <div className='text-20 leading-[24px] font-semibold'>
            {formatBalance(type === 'AMOUNT' ? totalAmount : totalValue)}
          </div>
          <div className='text-14 leading-17 mt-8'>Total Staked</div>
        </div>
        <div className='flex-1 flex flex-center flex-col'>
          <div className='text-20 leading-[24px] font-semibold text-31c26b'>{formatBalance(earning)}</div>
          <div className='text-14 leading-17 text-grey-2 mt-8'>Est. Earning</div>
        </div>
        <div className='flex-1 flex flex-center flex-col'>
          <div className='text-20 leading-[24px] text-primary font-semibold'>{(apy * 100).toFixed(2)}%</div>
          <div className='text-14 leading-17 text-grey-2 mt-8'>Est. APY</div>
        </div>
        <div className='text-grey-2 flex-1 flex justify-end'>
          <div className='text-20 leading-[24px] font-semibold'>{airdrop}</div>
          <div className='text-14 leading-17 mt-8'>Airdrop</div>
        </div>
      </div>
      <div className='mt-[33px] flex flex-between'>
        <Button className='w-[218px] h-40 py-0 text-14' round='lg' size='sm'>
          Stake More
        </Button>
        <Button className='w-[218px] h-40 py-0 text-14' round='lg' size='sm'>
          Unstake
        </Button>
        <Button className='w-[218px] h-40 py-0 text-14' round='lg' size='sm'>
          Claim Airdrop
        </Button>
        <Button className='w-[218px] h-40 py-0 text-14' round='lg' size='sm'>
          <Link href={`/stake/${forceToCurrencyName(token)}/mystake`}>View Details</Link>
        </Button>
      </div>
    </Card>
  );
});
