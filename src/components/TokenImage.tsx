import styled from 'styled-components';
import { Token } from '@acala-network/sdk-core';
import React, { FC } from 'react';
import { getTokenImage } from '../utils/token';
import { Size } from './types';
import Image from 'next/image';

export type TokenSize = Size | number;

export interface TokenProps {
  token: Token | string;
  size?: TokenSize;
  className?: string;
  wh?: number;
}

export interface ChainProps {
  chain: string;
  size?: TokenSize;
  className?: string;
  wh?: number;
}

const TOKEN_SIZES = {
  sm: 24,
  md: 32,
  default: 36,
  lg: 42,
};

const TokenWrapper = styled.div<{ size: TokenSize }>`
  width: ${({ size }) => TOKEN_SIZES[size] ?? size}px;
  height: ${({ size }) => TOKEN_SIZES[size] ?? size}px;

  flex-shrink: 0;
  flex-grow: 0;
  align-self: center;

  & > svg,
  & > img,
  & > div {
    width: ${({ size }) => TOKEN_SIZES[size] ?? size}px;
    height: ${({ size }) => TOKEN_SIZES[size] ?? size}px;
  }
`;

export const TokenImage: FC<TokenProps> = ({ className, token, size = 'md' }) => {
  if (!token) return null;

  return (
    <TokenWrapper className={className} size={size}>
      {getTokenImage(token)}
    </TokenWrapper>
  );
};

export const ChainIamge: FC<ChainProps> = ({ className, chain, size = 'md' }) => {
  if (!chain) return null;

  return (
    <TokenWrapper className={className} size={size}>
      <Image alt='symbol' height={'100%'}
        src={`https://resources.acala.network/networks/${chain}.png`} width={'100%'} />
    </TokenWrapper>
  );
};
