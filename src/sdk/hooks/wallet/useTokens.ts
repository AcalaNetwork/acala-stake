import { useEffect, useState } from 'react';
import { useWallet } from '.';
import { Token, TokenType } from '@acala-network/sdk-core';
import { SDKNetwork } from '@sdk/types';

export const useTokens = (network: SDKNetwork, type?: TokenType) => {
  const [data, setData] = useState<Token[]>();

  const wallet = useWallet(network);

  useEffect(() => {
    if (!wallet) return;

    const sub = wallet.subscribeTokens(type).subscribe({ next: (data) => setData(Object.values(data)) });

    return () => sub.unsubscribe();
  }, [wallet, setData, type]);

  return data;
};
