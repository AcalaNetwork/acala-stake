import React, { FC, useCallback, useState, createContext } from "react";

type IStep = "create" | "confirm" | "result";

interface BridgeContextProps {
  step: IStep;
  setStep: (step: IStep) => void;
}

export const BridgeProviderContext = createContext<BridgeContextProps>(
  {} as BridgeContextProps
);

export const BridgeProvider: FC = ({ children }) => {
  const [step, _setStep] = useState<IStep>("create");

  const setStep = useCallback(
    (step: IStep) => {
      _setStep(step);
    },
    [_setStep]
  );

  return (
    <BridgeProviderContext.Provider
      value={{
        step,
        setStep,
      }}
    >
      {children}
    </BridgeProviderContext.Provider>
  );
};
