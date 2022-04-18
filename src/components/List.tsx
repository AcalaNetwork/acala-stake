import clsx from 'clsx';
import React, { FC } from 'react';
import { BaseComponentProps } from './types';

interface ListProps extends BaseComponentProps {
  shadow?: boolean;
}

export const List: FC<ListProps> = React.memo(({ className, children, shadow = false }) => {
  return (
    <ul className={`p-20 border border-grey-5 rounded-8 ${shadow ? 'drop-shadow' : ''} ${className}`}>{children}</ul>
  );
});

export const ListItem = React.memo<BaseComponentProps>(({ className, children }) => {
  return <li className={clsx('flex justify-between items-center mb-16 last:mb-0', className)}>{children}</li>;
});

export const ListLabel = React.memo<BaseComponentProps>(({ className, children }) => {
  return <div className={clsx('text-14 leading-17 text-grey-3', className)}>{children}</div>;
});

export const ListValue = React.memo<BaseComponentProps>(({ className, children }) => {
  return <div className={clsx('text-14 leading-17 text-grey-2 font-medium', className)}>{children}</div>;
});
