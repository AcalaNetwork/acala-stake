import React from 'react';

export const PageContainer = React.memo(({ children }) => {
  return <div className='max-w-[1200px]'>{children}</div>;
});
