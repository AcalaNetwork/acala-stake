import React from 'react';
import { Loading } from './Loading';

export const PageLoading = React.memo(() => {
  return (
    <div className='flex-1 flex items-center justify-center'>
      <Loading />
    </div>
  );
});
