import React, { useState, createContext, memo, PropsWithChildren, useContext, useMemo } from 'react';
import { SDKNetwork } from '@sdk/types';


interface UnstakeContextData {
  network: SDKNetwork;
  step: number;
  setStep: (value: number) => void;
  hash: string;
  setHash: (value: string) => void;
}

export const UnstakeContext = createContext<UnstakeContextData>({} as UnstakeContextData);

export const UnstakeProvider = memo<PropsWithChildren<{ network: SDKNetwork }>>(({ network, children }) => {
  const [step, setStep] = useState<number>(0);
  const [hash, setHash] = useState<string>('');

  const data = useMemo(() =>({
    network,
    step,
    setStep,
    hash,
    setHash
  }), [hash, network, step]);

  return (
    <UnstakeContext.Provider
      value={data}
    >
      {children}
    </UnstakeContext.Provider>
  );
});

export const StakeConsumer = UnstakeContext.Consumer;

export const useUnstake = () => {
  return useContext(UnstakeContext);
};

