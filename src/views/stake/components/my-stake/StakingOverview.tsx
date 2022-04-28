import { InformationCircleIcon } from '@heroicons/react/outline';
import { Button, LinkButton } from '@components/Button';
import { Card } from '@components/Card';
import { FormatBalance } from '@components/FormatBalance';
import { FormatRatio } from '@components/FormatRatio';
import { FormatValue } from '@components/FormatValue';
import { Popover } from '@components/Popover';
import { useStakingOverview } from '../../hook/useStakingOverview';
import { memo } from 'react';
import { SDKNetwork } from '@sdk/types';
import { TokenName } from '@components/TokenName';
import { useUserLoanIncentive, usePresetTokens } from '@sdk';
import { ClaimLoanIncentiveRewards } from 'modals/ClaimLoanIncentiveRewards';
import { ModalType, useModal } from '@state';

interface StakingOverviewProps {
  network: SDKNetwork;
}

export const StakingOverview = memo<StakingOverviewProps>(({ network }) => {
  const data = useStakingOverview(network);
  const { liquidToken } = usePresetTokens(network);
  const rewards = useUserLoanIncentive(network, liquidToken);
  const { open: openClaim } = useModal(ModalType.ClaimLoanIncentiveRewards); 

  return (
    <Card className='px-60 pt-56 pb-32 mx-auto' variant='gradient-border'>
      {data ? (
        <div className='flex justify-around items-center text-grey-2 h-[156px] bg-primary bg-opacity-5 border border-grey-66 rounded-16'>
          <div className='flex flex-col items-center'>
            <div className='text-20 leading-24 font-semibold flex gap-10'>
              <FormatBalance balance={data.staked.amount} human />
              <TokenName token={data.staked.token} />
            </div>
            <div className='text-14 leading-17 my-12 text-grey-3 font-medium'>
              <FormatValue data={data.stakedValue} />
            </div>
            <div className='text-14 leading-17 mb-8 flex'>Total Staked</div>
          </div>
          <div className='flex flex-col items-center'>
            <div className='text-20 leading-24 font-semibold flex gap-10'>
              <FormatBalance balance={data.estEarning.amount} human />
              <TokenName token={data.estEarning.token} />
            </div>
            <div className='text-14 leading-17 my-12 text-grey-3 font-medium'>
              <FormatValue data={data.estEarningValue} />
            </div>
            <div className='text-14 leading-17 mb-8 flex'>
              Est. Earning
              <Popover
                className='text-14 font-normal'
                content={<div className='w-[180px]'>(Free Balance + Used as Collateral) * 1 year LDOT earning</div>}
              >
                <InformationCircleIcon className='w-18 h-18 text-grey-3' />
              </Popover>
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <div className='text-24 leading-29 font-semibold text-primary mb-16'>
              <FormatRatio data={data.apy} />
            </div>
            <div className='text-14 leading-17'>Est. APY</div>
          </div>
          {
            rewards && (
              <div className='flex flex-col items-center'>
                <div className='text-20 leading-24 font-semibold'>
                  {
                    rewards.rewards.map((data) => (
                      <div className='flex gap-4 mt-8 justify-end' key={`rewards-${data.rewardToken.symbol}`}>
                        <FormatBalance balance={data.claimableReward} />
                        <TokenName token={data.rewardToken} />
                      </div>
                    ))
                  }
                </div>
                <div className='text-14 leading-17 mt-12'>Airdrop</div>
              </div>
            )
          }
        </div>
      ) : null}
      <div className='flex flex-center gap-90 mt-33'>
        <LinkButton className='w-[200px]' href={`/stake/${network}`}
          size='sm'>
          Stake More
        </LinkButton>
        <LinkButton className='w-[200px]' href={`/stake/${network}/unstake`}
          size='sm'>
          Unstake
        </LinkButton>
        <Button className="w-[200px]" onClick={openClaim}
          size="sm">
          Claim Airdrop
        </Button>
      </div>
      <ClaimLoanIncentiveRewards
        network={network}
        token={liquidToken}
      />
    </Card>
  );
});
