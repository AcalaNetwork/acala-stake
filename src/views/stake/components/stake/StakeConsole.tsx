import { BridgeConsole } from '@views/bridge/components/BridgeConsole';
import { memo } from 'react';
import { StakeCover } from './StakeCover';
import { StakeSteps, useStakeContext } from './StakeProvider';

export const StakeConsole = memo(() => {
  const { step, network } = useStakeContext();
  const baseClassName = 'm-auto mt-40 w-[630px]';

  if (step === StakeSteps.INIT) return <StakeCover className={baseClassName} />;

  if (step === StakeSteps.BRIDGE) return <BridgeConsole className={baseClassName} network={network} />;

  return null;
});
