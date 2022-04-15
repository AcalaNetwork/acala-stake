import { BaseComponentProps } from "@components/types";
import clsx from "clsx";
import { memo, ReactNode } from "react";

interface FormErrorMessageProps extends BaseComponentProps {
  message?: ReactNode;
}

export const FormErrorMessage = memo<FormErrorMessageProps>(({ className, message }) => {
  if (!message) return null;

  return (
    <div className={clsx('text-red-500 text-14 leading-16 mt-4', className)}>
      {message}
    </div>
  );
});