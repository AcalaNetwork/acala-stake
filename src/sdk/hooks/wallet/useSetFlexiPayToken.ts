import type { MaybeCurrency } from '@acala-network/sdk-core';

import { forceToCurrencyName } from '@acala-network/sdk-core';
import { useFeeSwapPaths } from '@hooks/useFeeSwapPaths';
import { SDKNetwork } from '@sdk/types';
import { useCallback } from 'react';

export const useSetFlexiPayToken = (network: SDKNetwork) => {
  const swapPaths = useFeeSwapPaths(network);

  return useCallback((token?: MaybeCurrency) => {
    // eslint-disable-next-line no-undef-init
    let path: any[] | undefined = undefined;

    if (token) {
      path = swapPaths.find((item) => forceToCurrencyName(item[0]) === forceToCurrencyName(token));
    }

    if (path) {
      path = [path.map((item) => item.toChainData())];
    }

    return {
      network,
      method: 'setAlternativeFeeSwapPath',
      params: path,
      section: 'transactionPayment'
    };
  }, [network, swapPaths]);
};
