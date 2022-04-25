import { useContext } from 'react';
import { SDKContext } from '../..';
import { SDKNetwork } from '../../types';

export const useLiquidity = (type: SDKNetwork) => {
  const sdk = useContext(SDKContext);

  return sdk[type]?.liquidity;
};
