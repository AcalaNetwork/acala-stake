import { useHoma } from '.';
import { SDKNetwork } from '../../types';

export const useHomaConts = (network: SDKNetwork) => {
  const homa = useHoma(network);

  return homa.consts;
};
