import { BaseComponentProps } from '@components';
import { SDKNetwork } from '@sdk/types';
import React, { memo } from 'react';
import { BridgeProviderContext, useBridgeContext } from '../hooks/useBridgeContext';

export interface BridgeProviderProps extends BaseComponentProps {
  network: SDKNetwork;
  onBackInForm?: () => void;
  onComplated?: () => void;
}

export const BridgeProvider = memo<BridgeProviderProps>(({ onComplated, onBackInForm, network, children }) => {
  const data = useBridgeContext({
    network,
    onBackInForm,
    onComplated
  });

  return <BridgeProviderContext.Provider value={data}>{children}</BridgeProviderContext.Provider>;
});
