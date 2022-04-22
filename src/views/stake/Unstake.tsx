import { StakeLayout } from '@components/layout';
import { EnsureSDKReady } from '@sdk/components/EnsureSDKReady';
import { StakeTopBoard } from './components/StakeTopBoard';
import { UnstakeConsole } from './components/unstake/UnstakeConsole';
import { useRouter } from 'next/router';
import { SDKNetwork } from '@sdk/types';
import { StakeSubPageTabs } from './components/StakeSubTabs';
import { memo } from 'react';

export const UnStake = memo(() => {
  const router = useRouter();
  const network = router.query.network as SDKNetwork;

  return (
    <StakeLayout>
      <EnsureSDKReady requires={['acala-wallet', 'karura-wallet', 'acala-homa', 'karura-homa']}>
        <StakeTopBoard network={network} />
        <StakeSubPageTabs active={1} network={network} />
        <div className='container mt-40'>
          <UnstakeConsole network={network} />
        </div>
      </EnsureSDKReady>
    </StakeLayout>
  );
});
