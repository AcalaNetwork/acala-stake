import { useContext } from 'react';
import { SDKContext } from '../..';
import { SDKNetwork } from '../../types';

export const useHistory = (type?: SDKNetwork) => {
  const sdk = useContext(SDKContext);

  return sdk[type]?.history;
};
