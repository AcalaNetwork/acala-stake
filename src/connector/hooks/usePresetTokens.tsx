import { Token } from '@acala-network/sdk-core';
import { CurrencyId } from '@acala-network/types/interfaces';
import { useEffect, useState } from 'react';
import { useApi } from '..';
import { SDKNetwork } from '../../sdk/types';

interface PresetToken {
  nativeToken: Token;
  stableToken: Token;
  liquidToken: Token;
  stakingToken: Token;
  [k: string]: Token;
}

export const usePresetTokens = (network: SDKNetwork): PresetToken => {
  const apiConnector = useApi(network);
  const [data, setData] = useState<PresetToken>();

  useEffect(() => {
    const api = apiConnector?.api;

    if (!api || !api.isReady || !api.consts) return;

    const data = {} as PresetToken;

    data.nativeToken = Token.fromCurrencyId(api.consts.transactionPayment.nativeCurrencyId as any as CurrencyId);
    data.stableToken = Token.fromCurrencyId(api.consts.cdpEngine.getStableCurrencyId as any as CurrencyId);
    data.liquidToken = Token.fromCurrencyId(api.consts.homa?.liquidCurrencyId as any as CurrencyId);
    data.stakingToken = Token.fromCurrencyId(api.consts.homa?.stakingCurrencyId as any as CurrencyId);

    setData(data);
  }, [apiConnector?.api]);

  return data;
};
