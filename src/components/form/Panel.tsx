import React, { FC, PropsWithChildren, ReactNode } from "react";

type FormPanelProps = PropsWithChildren<{
	className?: string;
	label?: ReactNode;
	extra?: ReactNode;
}>;

export const FormPanel: FC<FormPanelProps> = ({ className, extra, children, label }) => {
  return (
    <div className={className}>
      {label ? (
        <div className="text-13 leading-16 text-7b7986 mb-8">{label}</div>
      ) : null}
      {children}
      {extra ? <div className="mt-8">{extra}</div> : null}
    </div>
  );
};
