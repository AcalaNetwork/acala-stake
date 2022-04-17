import { Step } from '@components';
import { useHomaConts } from '@sdk/hooks/homa';
import { getTokenName } from '@utils/token';
import { useMemo } from 'react';
import { memo } from 'react';
import { useStakeContext, StakeSteps } from './StakeProvider';

export const StakeStep = memo(() => {
  const { step, network } = useStakeContext();
  const consts = useHomaConts(network);
  const stakingToken = consts.stakingToken;

  const items = useMemo(
    () => [
      {
        value: StakeSteps.BRIDGE,
        label: `${getTokenName(stakingToken)} Balance`,
      },
      {
        value: StakeSteps.STAKE,
        label: 'Stake',
      },
      {
        value: StakeSteps.COMPLATED,
        label: 'Confirmation',
      },
    ],
    [stakingToken]
  );

  return (
    <Step active={step === StakeSteps.INIT ? StakeSteps.BRIDGE : step} className='w-[514px] m-auto' items={items} />
  );
});
