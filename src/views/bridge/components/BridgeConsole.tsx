import { Card } from '@components';
import { SDKNetwork } from '@sdk/types';
import { memo } from 'react';
import { BridgeProvider } from './BridgeProvider';
import { BridgeStepsController } from './BridgeStepsController';

interface BridegConsoleProps {
  network: SDKNetwork;
}

export const BridgeConsole = memo<BridegConsoleProps>(({ network }) => {
  return (
    <Card className='py-32 flex flex-center' variant='gradient-border'>
      <BridgeProvider network={network}>
        <BridgeStepsController />
      </BridgeProvider>
    </Card>
  );
});
