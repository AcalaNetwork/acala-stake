import React, { FC, useCallback, useState, createContext } from "react";

type IStep = "overview" | "create" | "confirm" | "result";

interface BorrowContextProps {
  step: IStep;
  steps: {
    id: number;
    desc: string;
  }[];
  setStep: (step: IStep) => void;
  getActive: (k: IStep) => number;
}

export const BorrowProviderContext = createContext<BorrowContextProps>(
  {} as BorrowContextProps
);

export const BorrowProvider: FC = ({ children }) => {
  const [step, _setStep] = useState<IStep>("overview");
  const [steps, setSteps] = useState([
    {
      id: 1,
      desc: 'Select Collateral'
    },{
      id: 2,
      desc: 'Open Vault'
    },{
      id: 3,
      desc: 'Confirmation'
    }
  ])

  const setStep = useCallback(
    (step: IStep) => {
      _setStep(step);
    },
    [_setStep]
  );

  const getActive = useCallback((k: IStep) => {
    if (k === "create") return 2;
    else if (k === "confirm") return 3;
    else return 4;
  }, []);

  return (
    <BorrowProviderContext.Provider
      value={{
        step,
        steps,
        setStep,
        getActive,
      }}
    >
      {children}
    </BorrowProviderContext.Provider>
  );
};
