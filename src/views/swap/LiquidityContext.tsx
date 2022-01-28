import React, { FC, useCallback, useState, createContext } from "react";

type IStep = "create" | "result";

interface LiquidityContextProps {
  tab: number;
  setTab: (tab: number) => void;
  step: IStep;
  setStep: (step: IStep) => void;
}

export const LiquidityProviderContext = createContext<LiquidityContextProps>(
  {} as LiquidityContextProps
);

export const LiquidityProvider: FC = ({ children }) => {
  const [step, _setStep] = useState<IStep>("create");
  const [tab, _setTab] = useState<number>(0);

  const setStep = useCallback(
    (step: IStep) => {
      _setStep(step);
    },
    [_setStep]
  );

  const setTab = useCallback(
    (tab: number) => {
      _setTab(tab)
    },
    [tab]
  )

  return (
    <LiquidityProviderContext.Provider
      value={{
        tab,
        setTab,
        step,
        setStep,
      }}
    >
      {children}
    </LiquidityProviderContext.Provider>
  );
};
