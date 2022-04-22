import clsx from 'clsx';
import React, { memo } from 'react';
import { BaseComponentProps } from './types';

type TopBoardProps = BaseComponentProps;

export const TopBoard = memo<TopBoardProps>(({ className, children }) => {
  return (
    <div
      className={clsx('bg-top-board w-screen h-[126px] min-h-[126px] bg-no-repeat bg-cover', className)}
      style={{ backgroundImage: `url("/images/top-board-bg.svg")` }}
    >
      <div className='container'>{children}</div>
    </div>
  );
});
