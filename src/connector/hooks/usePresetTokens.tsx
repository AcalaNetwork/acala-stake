import { Token } from '@acala-network/sdk-core';
import { useWallet } from '@sdk';
import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { SDKNetwork } from '../../sdk/types';

interface PresetToken {
  nativeToken?: Token;
  stableToken?: Token;
  liquidToken?: Token;
  stakingToken?: Token;
}

export const usePresetTokens = (network: SDKNetwork): PresetToken => {
  const wallet = useWallet(network);
  const [data, setData] = useState<PresetToken>();

  const run = useCallback(async () => {
    if (!wallet) return;

    await wallet.isReady;
    const tokens = wallet.getPresetTokens();

    setData(tokens);
  }, [wallet]);

  useEffect(() => {
    run();
  }, [run]);

  return data;
};
