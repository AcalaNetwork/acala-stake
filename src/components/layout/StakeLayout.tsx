import { FC } from 'react';
import { memo } from 'react';
import { StakeFooter } from '../footer';
import { Header } from '../header';

export const StakeLayout: FC = memo(({ children }) => {
  return (
    <div className='h-screen bg-body overflow-x-hidden overscroll-x-auto'>
      <div className='flex flex-col items-center justify-start min-w-full min-h-full'>
        <Header />
        <main className='flex flex-col flex-1 pb-8'>{children}</main>
        <StakeFooter />
      </div>
    </div>
  );
});
