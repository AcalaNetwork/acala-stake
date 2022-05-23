import { memo } from 'react';
import { StakeLayout } from '@components/layout';
import { EnsureSDKReady } from '@sdk/components/EnsureSDKReady';
import { Asset } from './components/Asset';
import { Details } from './components/Details';
import { useAssetOverview } from './hook/useAssetOverview';
import { DisplaySelector } from './components/DisplaySelector';
import { ClaimLoanIncentiveRewards } from 'modals/ClaimLoanIncentiveRewards';

export const Wallet = memo(() => {
  const { overview, details } = useAssetOverview();

  return (
    <StakeLayout>
      <EnsureSDKReady requires={['acala-wallet', 'karura-wallet', 'acala-homa', 'karura-homa']}>
        <div className='w-[1040px] mx-auto mb-[50px]'>
          <Asset className='mt-40' overview={overview} />
          <DisplaySelector className='mt-40' />
          <Details className='mt-40' details={details} />
        </div>
        <ClaimLoanIncentiveRewards />
      </EnsureSDKReady>
    </StakeLayout>
  );
});
