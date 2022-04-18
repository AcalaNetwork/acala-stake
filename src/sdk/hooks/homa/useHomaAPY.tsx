import { SDKNetwork } from '../../types';
import { useHomaEnv } from './useHomaEnv';

export const useHomaAPY = (network: SDKNetwork) => {
  const env = useHomaEnv(network);

  return env?.apy;
};
