import { StakeLayout } from '@components/layout';
import { EnsureSDKReady } from '@sdk/components/EnsureSDKReady';
import { StakeTopBoard } from './components/StakeTopBoard';
import { useRouter } from 'next/router';
import { SDKNetwork } from '@sdk/types';
import { StakeSubPageTabs } from './components/StakeSubTabs';
import { memo } from 'react';
import { UnstakeStepsController } from './components/unstake/UnstakeStepsController';
import { UnstakeProvider } from './components/unstake/UnstakeProvider';

export const UnStake = memo(() => {
  const router = useRouter();
  const network = router.query.network as SDKNetwork;

  return (
    <StakeLayout>
      <EnsureSDKReady requires={['acala-wallet', 'karura-wallet', 'acala-homa', 'karura-homa']}>
        <StakeTopBoard network={network} />
        <StakeSubPageTabs active={1} network={network} />
        <UnstakeProvider network={network}>
          <div className='container mt-40'>
            <UnstakeStepsController network={network}/>
          </div>
        </UnstakeProvider>
      </EnsureSDKReady>
    </StakeLayout>
  );
});
