import { Token } from '@acala-network/sdk-core';
import React, { FC } from 'react';
import { getTokenName } from '../utils/token';

export interface TokenProps {
  token: Token | string;
  className?: string;
  render?: (name: string) => string;
}

export const TokenName: FC<TokenProps> = ({ className, token, render }) => {
  if (!token) return null;

  const display = typeof token === 'string' ? token :  getTokenName(token);

  return <div className={className}>{render ? render(display) : display}</div>;
};
