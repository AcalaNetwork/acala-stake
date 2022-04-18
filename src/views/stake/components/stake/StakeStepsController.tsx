import { Transition } from "@headlessui/react";
import { BridgeConsole } from "@views/bridge/components/BridgeConsole";
import { StakeSteps } from "@views/stake/types";
import { memo, useCallback } from "react";
import { StakeComplated } from "./StakeComplated";
import { StakeConfirm } from "./StakeConfirm";
import { StakeCover } from "./StakeCover";
import { StakeForm } from "./StakeForm";
import { useStake } from "./StakeProvider";

export const StakeStepsController = memo(() => {
  const { step, network, setStep } = useStake();

  const backToCover = useCallback(() => {
    setStep(StakeSteps.COVER);
  }, [setStep]);

  return (
    <div className="flex flex-col items-center mt-40 w-full">
      <Transition show={step === StakeSteps.COVER}>
        <StakeCover />
      </Transition>
      <Transition
        enter="transition-opacity transition-300 transition-delay-10"
        enterFrom='opacity-0'
        enterTo='opacity-100'
        show={step === StakeSteps.BRIDGE}
      >
        <BridgeConsole
          card={false}
          network={network}
          onBakcInForm={backToCover}
        />
      </Transition>
      <Transition
        enter="transition-opacity transition-300 transition-delay-10"
        enterFrom='opacity-0'
        enterTo='opacity-100'
        show={step === StakeSteps.FORM}
      >
        <StakeForm />
      </Transition>
      <Transition
        enter="transition-opacity transition-300 transition-delay-10"
        enterFrom='opacity-0'
        enterTo='opacity-100'
        show={step === StakeSteps.CONFIRM}
      >
        <StakeConfirm />
      </Transition>
      <Transition
        enter="transition-opacity transition-300 transition-delay-10"
        enterFrom='opacity-0'
        enterTo='opacity-100'
        show={step === StakeSteps.COMPLATED}
      >
        <StakeComplated />
      </Transition>
    </div>
  );
});