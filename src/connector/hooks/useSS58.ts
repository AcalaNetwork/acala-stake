import { useApi } from '..';
import { defaults } from '@polkadot/util-crypto/address/defaults';
import { ConnectedNetworks } from 'config';

export const useSS58 = (network?: ConnectedNetworks) => {
  const api = useApi(network);

  return Number(api?.api?.registry.chainSS58.toString()) || defaults.prefix;
};
