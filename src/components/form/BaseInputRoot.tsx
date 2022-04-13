import React, { FC, ReactElement } from "react";
import { Size } from "../types";

interface BaseInputRootProps {
	size?: Size;
	className?: string;
	error?: boolean;
  focuse?: boolean;
	render?: ({ focuse }) => ReactElement;
	children?: BaseInputRootProps["render"] | JSX.Element | JSX.Element[];
}

export interface BaseInputElementProps {
	onFocuse?: () => void;
  onBlur?: () => void;
}

function getRootClassName(
  size: Size,
  error: boolean,
  focuse: boolean,
  customClassName: string
) {
  const base =
		"flex px-16 py-12 border rounded-[12px] text-left cursor-pointer items-center transition-all";

  const sizes: Partial<Record<Size, string>> = {
    md: "h-58",
  };

  const status = {
    normal: "border-eae9f0",
    error: "border-acala-origian-500",
    focuse: "border-primary",
  };

  return `${base} ${sizes[size] ?? ""} ${
    status[error ? "error" : focuse ? "focuse" : "normal"] ?? "" // error > focuse > normal
  } ${customClassName ?? ""}`;
}

export const BaseInputRoot: FC<BaseInputRootProps> = React.memo(
  ({ size = 'md', children, error, render, className = "", focuse = false }) => {
    const finalRender = render
      ? render
      : typeof children === "function"
        ? children
        : () => children;

    const rootClassName = getRootClassName(size, error, focuse, className);

    return (
      <div className={rootClassName}>
        {finalRender({ focuse })}
      </div>
    );
  }
);
