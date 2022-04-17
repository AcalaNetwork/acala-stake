import React, { FC, PropsWithChildren, ReactNode } from 'react';

type FormPanelProps = PropsWithChildren<{
  className?: string;
  label?: ReactNode;
  extra?: ReactNode;
  error?: string;
}>;

export const FormPanel: FC<FormPanelProps> = ({ className, error, extra, children, label }) => {
  return (
    <div className={className}>
      {label ? <div className='w-full text-13 leading-16 text-grey-2 mb-8 font-medium'>{label}</div> : null}
      {children}
      {extra ? <div className='mt-8'>{extra}</div> : null}
      {error ? <div className='mt-8 text-red-500 text-13 leading-16'>{error}</div> : null}
    </div>
  );
};
