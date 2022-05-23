import { RequiredActiveAccount } from '@components';
import { StakeLayout } from '@components/layout';
import { SDKNetwork } from '@sdk/types';
import { useRouter } from 'next/router';
import { memo } from 'react';
import { EnsureSDKReady } from '../../sdk/components/EnsureSDKReady';
import { StakingOverview } from './components/my-stake/StakingOverview';
import { StakeSubPageTabs } from './components/StakeSubTabs';
import { StakeTopBoard } from './components/StakeTopBoard';

export const MyStake = memo(() => {
  const router = useRouter();
  const network = router.query.network as SDKNetwork;

  return (
    <StakeLayout>
      <EnsureSDKReady requires={['acala-homa', 'karura-homa', 'acala-wallet', 'karura-wallet']}>
        <StakeTopBoard network={network} />
        <StakeSubPageTabs active={2} network={network} />
        <div className='container mt-40 mb-[80px]'>
          <RequiredActiveAccount className='min-h-[560px]'>
            <StakingOverview network={network} />
          </RequiredActiveAccount>
        </div>
      </EnsureSDKReady>
    </StakeLayout>
  );
});
