import React, {
  useState,
  createContext,
  useMemo,
  memo,
  PropsWithChildren,
  useContext
} from "react";
import { SDKNetwork } from "@sdk/types";

export enum StakeSteps {
  'INIT',
  'BRIDGE',
  'STAKE',
  'COMPLATED'
}

interface StakeContextProps {
  network: SDKNetwork;
  step: StakeSteps;
  hooks: {
    useSetStep: () => (value: StakeSteps) => void;
  }
}

export const StakeContext = createContext<StakeContextProps>({} as StakeContextProps);

export const StakeProvider = memo<PropsWithChildren<{ network: SDKNetwork }>>(({ network, children }) => {
  const [step, setStep] = useState<StakeSteps>(StakeSteps.INIT);

  const hooks = useMemo(() => ({
    useSetStep: () => setStep
  }), [setStep]);

  return (
    <StakeContext.Provider
      value={{
        network,
        step,
        hooks
      }}
    >
      {children}
    </StakeContext.Provider>
  );
});

export const StakeConsumer = StakeContext.Consumer;

export const useStakeContext = () => {
  return useContext(StakeContext);
};
