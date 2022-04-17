import { useContext } from 'react';
import { BridgeProviderContext } from './useBridgeContext';

export const useBridge = () => {
  return useContext(BridgeProviderContext);
};
