import React, { FC, PropsWithChildren, ReactNode } from 'react';
import { FormErrorMessage } from './FormErrorMessage';

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
      <FormErrorMessage message={error} />
    </div>
  );
};
