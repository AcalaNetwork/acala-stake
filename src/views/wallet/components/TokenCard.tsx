import { memo } from 'react';
import { Button, LinkButton } from '@components/Button';
import { Card } from '@components/Card';
import { TokenImage } from '@components/TokenImage';
import { TokenName } from '@components/TokenName';
import { getTokenFullName } from '@utils/token';
import { StakeData } from '../hook/useAssetOverview';
import { BaseComponentProps, FormatBalance, FormatValue } from '@components';
import { ModalType, useBalanceDisplayType, useBalanceVisible, useModal } from '@state';
import clsx from 'clsx';
import { useUserLoanIncentive, usePresetTokens } from '@sdk';

interface TokenCardProps extends StakeData, BaseComponentProps {
}

export const TokenCard = memo<TokenCardProps>(({
  token,
  amount,
  value,
  estEarning,
  apy,
  chain,
  className,
}) => {
  const { type } = useBalanceDisplayType();
  const visiable = useBalanceVisible();
  const { liquidToken } = usePresetTokens(chain);
  const rewards = useUserLoanIncentive(chain, liquidToken );
  const { openWithData: openCliam } = useModal(ModalType.ClaimLoanIncentiveRewards);

  return (
    <Card className={clsx('px-52 py-32', className)} variant='gradient-border'>
      <div className='wallet-card-gradient-bg absolute w-full h-full top-0 left-0' />
      <div className='flex items-center'>
        <TokenImage size={52} token={token} />
        <div className='ml-17'>
          <TokenName className='text-20 leading-24 text-grey-2 font-semibold' token={token} />
          <div className='text-16 leading-20 font-medium text-grey-3 mt-8'>{getTokenFullName(token)}</div>
        </div>
      </div>
      <div className='mt-24 flex flex-between bg-primary bg-opacity-5 border border-grey-66 rounded-16 h-[105px] px-[50px]'>
        <div className='text-grey-2 flex-1'>
          <div className='text-20 leading-24 font-semibold'>
            {
              type === 'AMOUNT' ? <FormatBalance balance={amount} visiable={visiable} /> : <FormatValue data={value} visiable={visiable} />
            }
          </div>
          <div className='text-14 leading-17 mt-8'>Total Staked</div>
        </div>
        <div className='flex-1 flex flex-center flex-col'>
          <div className='text-20 leading-24p font-semibold text-31c26b'>
            <FormatValue data={estEarning} visiable={visiable} />
          </div>
          <div className='text-14 leading-17 text-grey-2 mt-8'>Est. Earning</div>
        </div>
        <div className='flex-1 flex flex-center flex-col'>
          <div className='text-20 leading-24 text-primary font-semibold'>{(apy * 100).toFixed(2)}%</div>
          <div className='text-14 leading-17 text-grey-2 mt-8'>Est. APY</div>
        </div>
        <div className='text-grey-2 flex-1 flex justify-end flex-col items-center'>
          <div className='text-18 leading-20 font-semibold'>
            {
              rewards ? (
                rewards.rewards.map((item) => {
                  return (
                    <div className='flex gap-4 mt-8 justify-end' key={`${item.rewardToken.symbol}`}>
                      <FormatBalance balance={item.claimableReward} />
                      <TokenName token={item.rewardToken} />
                    </div>
                  );
                })
              ) : 'NaN'
            }
          </div>
          <div className='text-14 leading-17 mt-8'>Rewards</div>
        </div>
      </div>
      <div className='mt-[33px] flex flex-between'>
        <LinkButton className='w-[218px] h-40 py-0 text-14' href={`/staking/${chain}`}
          round='lg'
          size='sm'>
          Stake More
        </LinkButton>
        <LinkButton className='w-[218px] h-40 py-0 text-14' href={`stake/${chain}/unstake`}
          round='lg'
          size='sm'>
          Unstake
        </LinkButton>
        <Button className='w-[218px] h-40 py-0 text-14' onClick={() => openCliam({ network: chain, token: liquidToken })}
          round='lg'
          size='sm'>
          Claim Rewards
        </Button>
        <LinkButton className='w-[218px] h-40 py-0 text-14' href={`stake/${chain}/user`}
          round='lg'
          size='sm'>
            View Details
        </LinkButton>
      </div>
    </Card>
  );
});
