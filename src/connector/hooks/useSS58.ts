import { useApi } from '..';
import { CONNECTED_NETWORK } from '../../config';
import { defaults } from '@polkadot/util-crypto/address/defaults';

export const useSS58 = (network?: CONNECTED_NETWORK) => {
  const api = useApi(network);

  return Number(api?.api?.registry.chainSS58.toString()) || defaults.prefix;
};
