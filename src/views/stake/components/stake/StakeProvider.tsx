import React, { useState, createContext, memo, PropsWithChildren, useContext, useMemo } from 'react';
import { SDKNetwork } from '@sdk/types';
import { StakeSteps } from '@views/stake/types';
import { useHomaConts } from '@sdk/hooks/homa';
import { Token } from '@acala-network/sdk-core';
import { StakingInputData, useStakeInput } from '@views/stake/hook/useStakeInput';
import { useBoolean } from '@hooks';
import { StakeCallData, useStakeCall } from '@views/stake/hook/useStakeCall';


interface StakeContextData {
  network: SDKNetwork;
  step: StakeSteps;
  setStep: (value: StakeSteps) => void;
  stakingToken: Token;
  liquidToken: Token;
  stakingInput: StakingInputData;
  stakeImmediately: ReturnType<typeof useBoolean>;
  callData: StakeCallData;
  hash: string;
  setHash: (value: string) => void;
}

export const StakeContext = createContext<StakeContextData>({} as StakeContextData);

export const StakeProvider = memo<PropsWithChildren<{ network: SDKNetwork }>>(({ network, children }) => {
  const [step, setStep] = useState<StakeSteps>(StakeSteps.COVER);
  const conts = useHomaConts(network);
  const { stakingToken, liquidToken } = conts;
  const stakingInput = useStakeInput({ network, stakingToken });
  const [hash, setHash] = useState<string>('');
  const stakeImmediately = useBoolean(true);
  const callData = useStakeCall({
    network,
    amount: stakingInput?.inputProps?.value?.toString(),
    stakeImmediately: stakeImmediately.value,
    stakingToken,
    liquidToken
  });

  const data = useMemo(() =>({
    stakingToken,
    liquidToken,
    network,
    step,
    setStep,
    stakingInput,
    stakeImmediately,
    callData,
    hash,
    setHash
  }), [stakingToken, liquidToken, network, step, stakingInput, stakeImmediately, callData, hash]);

  return (
    <StakeContext.Provider
      value={data}
    >
      {children}
    </StakeContext.Provider>
  );
});

export const StakeConsumer = StakeContext.Consumer;

export const useStake = () => {
  return useContext(StakeContext);
};
