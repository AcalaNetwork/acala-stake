import { useContext } from 'react';
import { SDKContext } from '../..';
import { SDKNetwork } from '../../types';

export const useWallet = (network?: SDKNetwork) => {
  const sdk = useContext(SDKContext);

  return sdk[network]?.wallet;
};
