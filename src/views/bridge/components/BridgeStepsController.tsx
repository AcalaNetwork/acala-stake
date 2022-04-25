import { memo } from "react";
import { useBridge } from "../hooks/useBridger";
import { BridgeSteps } from "../types";
import { BridgeConfirm } from "./BridgeConfirm";
import { BridgeForm } from "./BridgeForm";
import { BridgeComplated } from "./BridgeComplated";

export const BridgeStepsController = memo(() => {
  const { step } = useBridge();

  if (step === BridgeSteps.FORM) return <BridgeForm />;

  if (step === BridgeSteps.CONFIRM) return <BridgeConfirm />;
  
  if (step === BridgeSteps.COMPLATED) return <BridgeComplated />;

  return null;
});