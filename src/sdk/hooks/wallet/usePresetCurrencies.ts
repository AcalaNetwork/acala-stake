import { PresetTokens } from '@acala-network/sdk/wallet/type';
import { useMemo } from 'react';
import { useWallet } from '.';

export function usePresetCurrencies(): PresetTokens {
  const wallet = useWallet();

  return useMemo(() => wallet?.getPresetTokens(), [wallet]);
}
