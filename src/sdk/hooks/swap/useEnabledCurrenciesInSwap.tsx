import { useTokens, useWallet } from '..';
import { useState } from 'react';
import { Token, TokenType, unzipDexShareName } from '@acala-network/sdk-core';
import { useSubscription } from '../../../hooks/useSubscription';
import { combineLatest } from 'rxjs';

export const useEnabledCurrenciesInSwap = () => {
  const currencies = useTokens(TokenType.DEX_SHARE);
  const wallet = useWallet();
  const [data, setData] = useState<Token[]>();

  useSubscription(() => {
    if (!currencies || !currencies.length || !wallet) return;

    const temp = new Set<string>();

    // get all used token
    currencies.forEach((token) => {
      const [name1, name2] = unzipDexShareName(token.name);

      temp.add(name1);
      temp.add(name2);
    });

    const tokens$ = Object.fromEntries(
      Array.from(temp).map((name) => {
        return [name, wallet.subscribeToken(name)];
      })
    );

    return combineLatest(tokens$).subscribe({
      next: (data) => setData(Object.values(data)),
    });
  }, [currencies]);

  return data;
};
