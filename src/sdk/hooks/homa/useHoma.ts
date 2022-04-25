import { useContext } from 'react';
import { SDKContext } from '../..';
import { SDKNetwork } from '../../types';

export const useHoma = (type: SDKNetwork) => {
  const sdk = useContext(SDKContext);

  return sdk[type]?.homa;
};
