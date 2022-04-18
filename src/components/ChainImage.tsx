import { getNetworkImage } from '@utils';
import clsx from 'clsx';
import React, { memo } from 'react';

export interface ChainImageProps {
  chain: string;
  className?: string;
}

export const ChainImage = memo<ChainImageProps>(({ className, chain }) => {
  if (!chain) return null;

  return (
    <div
      className={clsx(`h-32 w-32 rounded-full`, className)} 
      style={{
        background: `url(${getNetworkImage(chain)}) no-repeat center center/100% 100%`
      }}
    />
  );
});
