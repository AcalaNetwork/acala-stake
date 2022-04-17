import { encodeAddress } from '@polkadot/keyring';

export const formatAddress = (address: string, ss58: number | string, mini = true) => {
  const addWithSS58 = encodeAddress(address, Number(ss58) || 42);

  return mini ? addWithSS58.replace(/(\w{6})\w*?(\w{6}$)/, '$1...$2') : addWithSS58;
};
