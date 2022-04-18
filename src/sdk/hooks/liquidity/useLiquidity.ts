import { useContext } from 'react';
import { SDKContext } from '../..';
import { SDKNetwork } from '../../types';

export const useLiquidity = (type?: SDKNetwork) => {
  const sdk = useContext(SDKContext);

  if (type === 'karura') {
    return sdk.karura.liquidity;
  }

  return sdk.acala.liquidity;
};
