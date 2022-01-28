import { FixedPointNumber } from "@acala-network/sdk-core";
import { Codec } from '@polkadot/types/types';

export const formatBalance = (balance: FixedPointNumber |  Codec | number | string | undefined): number => {
  if (typeof balance === 'number') return balance;

  if (typeof balance === 'string') return Number(balance);

  if (balance instanceof FixedPointNumber) return balance.toNumber();

  try {
    // for Codec
    return FixedPointNumber.fromInner(balance?.toString() || 0).toNumber(6);
  } catch (e) {
    // swallow error
  }

  return 0;
};