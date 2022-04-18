import { SDKNetwork } from '../../types';
import { useHomaEnv } from './useHomaEnv';

export const useHomaTotalStaking = (network: SDKNetwork) => {
  const env = useHomaEnv(network);

  return env?.totalStaking;
};
