import type { MaybeCurrency } from '@acala-network/sdk-core';

import { forceToCurrencyId, forceToCurrencyName } from '@acala-network/sdk-core';
import { useCallback } from 'react';
import { useApi } from '../../../connector';
import { usePresetTokens } from '../../../connector/hooks/usePresetTokens';
import { SDKNetwork } from '../../types';


export const useSetFlexiPayToken = (network: SDKNetwork) => {
  const {api} = useApi();
  const presetTokens = usePresetTokens(network);

  return useCallback((token?: MaybeCurrency) => {
    // eslint-disable-next-line no-undef-init
    let path: any[] | undefined = undefined;

    if (token) {
      const tokenName = forceToCurrencyName(token);

      path = [[forceToCurrencyId(api, token), presetTokens?.nativeToken.toChainData()]];

      if (tokenName === forceToCurrencyName(presetTokens?.nativeToken)) {
        path = [api.createType('Option<Vec<CurrencyId>>' as any)];
      }

      if (tokenName === 'AUSD' || tokenName === 'KUSD') {
        path = [[forceToCurrencyId(api, token), forceToCurrencyId(api, 'KSM'), presetTokens?.nativeToken.toChainData()]];
      }
    }

    return {
      method: 'setAlternativeFeeSwapPath',
      params: path,
      section: 'transactionPayment'
    };
  }, [api, presetTokens, network]);
};
