import { getNetworkImage } from '@utils';
import clsx from 'clsx';
import React, { memo } from 'react';
import { BaseComponentProps } from './types';

export interface ChainImageProps extends BaseComponentProps {
  chain: string;
  size?: number;
}

export const ChainImage = memo<ChainImageProps>(({ className, chain, size }) => {
  if (!chain) return null;

  return (
    <div
      className={clsx(`h-32 w-32 rounded-full`, className)} 
      style={{
        background: `url(${getNetworkImage(chain)}) no-repeat center center/100% 100%`,
        width: size,
        height: size
      }}
    />
  );
});
