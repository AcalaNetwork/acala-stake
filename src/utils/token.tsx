import { forceToCurrencyName, unzipDexShareName, isDexShareName, MaybeCurrency, Token } from '@acala-network/sdk-core';
import { SDKNetwork } from '@sdk/types';
import Image from 'next/image';
import React from 'react';

import { ACALA_TOKEN_LISTS, KARURA_TOKEN_LISTS } from '../sdk';

export function getSavedToken(network: SDKNetwork, token: MaybeCurrency): Token {
  const name = forceToCurrencyName(token);

  return network === 'acala' ? ACALA_TOKEN_LISTS[name] : KARURA_TOKEN_LISTS[name];
}

export function getTokenName(token?: Token): string {
  if (!token) return '';

  // handle single token
  let name = forceToCurrencyName(token);

  // handle foreign asset
  if (token?.isForeignAsset) {
    name = token.symbol;
  }

  // handle dex share token
  if (isDexShareName(name)) {
    const _token = unzipDexShareName(name);

    return `LP ${_token[0]}-${_token[1]}`;
  }

  return token.display;
}

const fixSymbol = (a: string) => {
  if (a === 'aUSD') return 'AUSD';

  if (a === 'lcDOT') return 'LCDOT';

  return a;
}

export function getTokenImage(
  token: Token | string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: React.PropsWithChildren<any>
): JSX.Element {
  const symbol = fixSymbol(token instanceof Token ?  token.symbol : token);

  const resource = `https://resources.acala.network/tokens/${symbol}.png`;

  return <Image alt='symbol' height={'100%'}
    src={resource} width={'100%'}
    {...props} />;
}

export function getTokenFullName(token: Token | string) {
  if (typeof token === 'string') return token;

  return token.fullname;
}