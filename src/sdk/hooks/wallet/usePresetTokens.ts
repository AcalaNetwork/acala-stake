import { PresetTokens } from '@acala-network/sdk/wallet/type';
import { SDKNetwork } from '@sdk/types';
import { useMemo } from 'react';
import { useWallet } from './useWallet';

export function usePresetTokens(network: SDKNetwork): PresetTokens {
  const wallet = useWallet(network);

  return useMemo(() => wallet?.getPresetTokens(), [wallet]);
}
