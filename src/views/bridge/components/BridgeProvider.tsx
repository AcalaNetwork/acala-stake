import { BaseComponentProps } from '@components';
import { SDKNetwork } from '@sdk/types';
import React, { memo } from 'react';
import { BridgeProviderContext, useBridgeContext } from '../hooks/useBridgeContext';

export interface BridgeProviderProps extends BaseComponentProps {
  network: SDKNetwork;
}

export const BridgeProvider = memo<BridgeProviderProps>(({ network, children }) => {
  const data = useBridgeContext(network);

  return <BridgeProviderContext.Provider value={data}>{children}</BridgeProviderContext.Provider>;
});
