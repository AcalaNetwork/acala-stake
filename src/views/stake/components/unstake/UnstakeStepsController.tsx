import { Transition } from '@headlessui/react';
import { SDKNetwork } from '@sdk/types';
import { memo } from 'react';
import { UnstakeComplated } from './UnstakeComplated';
import { UnstakeConsole } from './UnstakeConsole';
import { useUnstake } from './UnstakeProvider';

export const UnstakeStepsController = memo<{ network: SDKNetwork }>(({ network }) => {
  const { step } = useUnstake();
  return (
    <>
      <Transition
        enter='transition-opacity transition-300 transition-delay-10'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        show={step === 0}
      >
        <UnstakeConsole network={network} />
      </Transition>
      <Transition
        enter='transition-opacity transition-300 transition-delay-10'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        show={step === 1}
      >
        <UnstakeComplated />
      </Transition>
    </>
  );
});
