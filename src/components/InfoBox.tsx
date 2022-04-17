import clsx from 'clsx';
import { memo } from 'react';
import { BaseComponentProps } from './types';

type InfoBoxProps = BaseComponentProps;

export const InfoBox = memo<InfoBoxProps>(({ className, children }) => {
  return (
    <div
      className={clsx(
        'h-60 rounded-12 border border-opacity-30 border-primary flex items-center justify-start pl-16 pr-20',
        className
      )}
    >
      {children}
    </div>
  );
});
