import React, { memo } from 'react';
import { StakeLayout } from '@components';
import { EnsureSDKReady } from '@sdk/components/EnsureSDKReady';
import { BridgeTopBoard } from './components/BridgeBoard';
import { useRouter } from 'next/router';
import { SDKNetwork } from '@sdk/types';
import { BridgeConsole } from './components/BridgeConsole';

export const Bridge = memo(() => {
  const router = useRouter();
  const network = router.query.network as SDKNetwork;

  return (
    <StakeLayout>
      <EnsureSDKReady requires={['acala-wallet', 'karura-wallet', 'acala-homa', 'karura-homa', 'crosschain']}>
        <BridgeTopBoard network={network} />
        <div className='container mt-[39px]'>
          <BridgeConsole network={network} />
        </div>
      </EnsureSDKReady>
    </StakeLayout>
  );
});
