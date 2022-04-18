import React, { FC } from 'react';

interface SpacingProps {
  w?: number;
  h?: number;
  className?: string;
}

export const Spacing: FC<SpacingProps> = React.memo(({ w, h, className }) => {
  return <div className={className} style={{ width: w, height: h }} />;
});
