import React, { FC, PropsWithChildren } from 'react';

type ListProps = PropsWithChildren<{
  className?: string
  shadow?: boolean
}>

export const List: FC<ListProps> = React.memo(({ className, children, shadow = false }) => {
  return (
    <ul className={`p-20 border border-eae9f0 rounded-8 ${ shadow ? 'drop-shadow' : ''} ${className}`}>
      {children}
    </ul>
  );
});

export const ListItem = React.memo(({ children }) => {
  return (
    <li className='flex justify-between items-center mb-16 last:mb-0'>{children}</li>
  );
});

export const ListLabel = React.memo(({ children }) => {
  return (
    <div className='text-14 leading-17 text-494853'>{children}</div>
  );
});

export const ListValue = React.memo(({ children }) => {
  return (
    <div className='text-14 leading-17 text-2e2d33 font-medium'>{children}</div>
  );
});