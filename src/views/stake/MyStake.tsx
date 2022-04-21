import { StakeLayout } from '@components/layout';
import { SDKNetwork } from '@sdk/types';
import { useRouter } from 'next/router';
import { memo } from 'react';
import { EnsureSDKReady } from '../../sdk/components/EnsureSDKReady';
import { StakingOverview } from './components/my-stake/StakingOverview';
import { TabsCard } from './components/my-stake/TabsCard';
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
        <div className='container pt-40'>
          <StakingOverview network={network} />
        </div>
        <div className='container pt-40'>
          <TabsCard network={network} />
        </div>
      </EnsureSDKReady>
    </StakeLayout>
  );
});
