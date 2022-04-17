import { useContext } from 'react';
import { SDKContext } from '../..';
import { SDKNetwork } from '../../types';

export const useSwap = (type?: SDKNetwork) => {
  const sdk = useContext(SDKContext);

  if (type === 'karura') {
    return sdk.karura.swap;
  }

  return sdk.acala.swap;
};
