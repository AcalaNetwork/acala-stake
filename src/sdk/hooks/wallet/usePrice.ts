import { useState } from 'react';
import { FixedPointNumber, MaybeCurrency } from '@acala-network/sdk-core';
import { PriceProviderType } from '@acala-network/sdk/wallet/price-provider/types';
import { useSubscription } from '@hooks/useSubscription';
import { useWallet } from '.';
import { SDKNetwork } from '../../types';

export function usePrice(network: SDKNetwork, token: MaybeCurrency, type = PriceProviderType.AGGREGATE) {
  const [price, setPrice] = useState<FixedPointNumber>(FixedPointNumber.ZERO);
  const wallet = useWallet(network);

  useSubscription(() => {
    if (!wallet) return;

    return wallet.subscribePrice(token, type).subscribe({
      next: (value) => {
        value && setPrice(value);
      },
    });
  }, [wallet]);

  return price;
}
