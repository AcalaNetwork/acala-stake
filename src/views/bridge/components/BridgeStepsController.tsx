import { Transition } from "@headlessui/react";
import { memo } from "react";
import { useBridge } from "../hooks/useBridger";
import { BridgeSteps } from "../types";
import { BridgeConfirm } from "./BridgeConfirm";
import { BridgeForm } from "./BridgeForm";
import { BridgeSuccess } from "./BridgeSuccess";

export const BridgeStepsController = memo(() => {
  const { step } = useBridge();

  return (
    <>
      <Transition show={step === BridgeSteps.FORM}>
        <BridgeForm />
      </Transition>
      <Transition
        enter="transition-opacity transition-300"
        enterFrom='opacity-0'
        enterTo='opacity-100'
        show={step === BridgeSteps.CONFIRM}
      >
        <BridgeConfirm />
      </Transition>
      <Transition
        enter="transition-opacity transition-300"
        enterFrom='opacity-0'
        enterTo='opacity-100'
        show={step === BridgeSteps.COMPLATED}
      >
        <BridgeSuccess />
      </Transition>
    </>
  );
});