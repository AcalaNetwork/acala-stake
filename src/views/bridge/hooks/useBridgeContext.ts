import { useActiveAccount } from '@connector';
import { useHomaConts } from '@sdk/hooks/homa';
import { SDKNetwork } from '@sdk/types';
import { useState, createContext, useMemo, useEffect } from 'react';
import { useBridgeAmountInput } from './useBridgeAmountInput';
import { useBridgeDestAddress } from './useBridgeDestAddress';
import { useBridgeRouter } from './useBridgeRouterSelector';
import { BridgeSteps } from '../types';

export const BridgeProviderContext = createContext<BridgeContextData>({} as BridgeContextData);

export interface UseBridgeContextConfigs {
  network: SDKNetwork;
  onBackInForm?: () => void;
  onComplated?: () => void;
}

export const useBridgeContext = ({ network, onBackInForm, onComplated }: UseBridgeContextConfigs) => {
  const [step, setStep] = useState<BridgeSteps>(BridgeSteps.FORM);
  const conts = useHomaConts(network);
  const { stakingToken } = conts;
  const active = useActiveAccount();
  const bridgeRouter = useBridgeRouter({ token: stakingToken, to: network });
  const bridgeAmountInput = useBridgeAmountInput(bridgeRouter.fromChain, {
    to: bridgeRouter.toChain,
    token: stakingToken.symbol,
    address: active?.address
  });
  const bridgeDestAddress = useBridgeDestAddress({
    init: active?.address,
    toChain: bridgeRouter.toChain
  });

  useEffect(() => {
    // reset all data when network changed
    setStep(BridgeSteps.FORM);
    bridgeAmountInput[0].onReset();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network]);

  return useMemo(
    () => ({
      step,
      setStep,
      token: stakingToken,
      bridgeRouter,
      bridgeAmountInput,
      bridgeDestAddress,
      onBackInForm,
      onComplated,
    }),
    [step, stakingToken, bridgeRouter, bridgeAmountInput, bridgeDestAddress, onBackInForm, onComplated]
  );
};

export type BridgeContextData = ReturnType<typeof useBridgeContext>;
