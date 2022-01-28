import styled from 'styled-components';
import { forceToCurrencyName, isDexShareName, unzipDexShareName, MaybeCurrency } from '@acala-network/sdk-core';
import React, { FC } from 'react';
import { getTokenImage } from '../utils/token';
import { Size } from './types';

export type TokenSize = Size | number;

export interface TokenProps {
  token: MaybeCurrency;
  size?: TokenSize
  className?: string;
  wh?: number;
}

const TOKEN_SIZES = {
  'sm': 24,
  'md': 32,
  'default': 36,
  'lg': 42,
}

const TokenWrapper = styled.div<{ size: TokenSize }>`
  width: ${({ size }) => TOKEN_SIZES[size] ?? size }px;
  height: ${({ size }) => TOKEN_SIZES[size] ?? size }px;

  flex-shrink: 0;
  flex-grow: 0;
  align-self: center;

  & > svg, & > img, & > div {
    width: ${({ size }) => TOKEN_SIZES[size] ?? size }px;
    height: ${({ size }) => TOKEN_SIZES[size] ?? size }px;
  }
`;

const LPWrapper = styled.div<{ size: TokenSize }>`
  display: flex;
  width: ${({ size }) => (TOKEN_SIZES[size] ?? size) * 1.5}px;
  height: ${({ size }) => (TOKEN_SIZES[size] ?? size)}px;

  flex-shrink: 0;
  flex-grow: 0;
  align-self: center;

  & > div:nth-child(1) {
    z-index: 1;
  }

  & > div:nth-child(2) {
    transform: translate3d(-${({ size }): number => (TOKEN_SIZES[size] ?? size) * 0.5}px, 0, 0);
  }
`;

export const TokenImage: FC<TokenProps> = ({ className, token, size = 'md' }) => {
  if (!token) return null;

  const name = forceToCurrencyName(token);
  const isLPToken = isDexShareName(name);

  // render lp token
  if (isLPToken) {
    const [token1, token2] = unzipDexShareName(name);

    return (
      <LPWrapper size={size} className={className}>
        <TokenWrapper size={size}>{getTokenImage(token1)}</TokenWrapper>
        <TokenWrapper size={size}>{getTokenImage(token2)}</TokenWrapper>
      </LPWrapper>
    );
  }

  // render single token
  return (
    <TokenWrapper size={size} className={className}>{getTokenImage(name)}</TokenWrapper> 
  );
};
