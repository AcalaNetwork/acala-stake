import { Step } from '@components';
import { useHomaConts } from '@sdk/hooks/homa';
import { getTokenName } from '@utils/token';
import { StakeSteps } from '../../types';
import { useMemo } from 'react';
import { memo } from 'react';
import { useStake } from './StakeProvider';

export const StakeStep = memo(() => {
  const { step, network } = useStake();
  const consts = useHomaConts(network);
  const stakingToken = consts.stakingToken;

  const items = useMemo(
    () => [
      {
        value: StakeSteps.BRIDGE,
        label: `${getTokenName(stakingToken)} Balance`,
      },
      {
        value: StakeSteps.FORM,
        label: 'Stake',
      },
      {
        value: StakeSteps.CONFIRM,
        label: 'Confirmation',
      },
    ],
    [stakingToken]
  );

  const currentStep = useMemo(() => {
    if (step === StakeSteps.COVER) return StakeSteps.BRIDGE;

    if (step === StakeSteps.COMPLATED) return StakeSteps.CONFIRM;

    return step;
  }, [step]);

  return (
    <Step active={currentStep} className='w-[514px] m-auto'
      items={items} />
  );
});
