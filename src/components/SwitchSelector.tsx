import React, { FC, useCallback } from "react";

interface SwitchSelectorProps {
	onChange?: (value: string) => void;
	value?: string;
	className?: string;
}

interface SwitchSelectorItemProps {
	value?: string;
	className?: string;
	active?: boolean;
	onClick?: (value: string) => void;
}

function getSwitchSelectorClassName(className?: string) {
  const basic =
		"relative flex item-stretch bg-eae9f0 border border-d6d3de rounded-12 h-36 w-[fit-content] p-[2px]";

  return `${basic} ${className ?? ""}`;
}

function getSwitchSelectorItemClassName(active?: boolean, className?: string) {
  const basic =
		"flex-1 text-14 min-w-[64px] rounded-[11px] font-medium flex items-center justify-center cursor-pointer select-none";

  const colors = {
    active: "text-fff bg-primary transition-all",
    "non-active": "text-abaab9 ",
  };

  return `${basic} ${colors[active ? "active" : "non-active"]} ${
    className ?? ""
  }`;
}

export const SwitchSelector: FC<SwitchSelectorProps> = React.memo(
  ({ className, children, value, onChange }) => {
    return (
      <div className={`${getSwitchSelectorClassName(className)}`}>
        {React.Children.map(children, (item) => {
          if (!React.isValidElement(item)) return;

          return React.cloneElement(item, {
            ...item.props,
            active: value === item.props?.value,
            onClick: onChange,
          });
        })}
      </div>
    );
  }
);

export const SwitchSelectorItem: FC<SwitchSelectorItemProps> = React.memo(
  ({ active, className, children, value, onClick }) => {
    const handleClick = useCallback(() => {
      if (onClick) {
        onClick(value);
      }
    }, [onClick, value]);

    return (
      <div
        className={getSwitchSelectorItemClassName(active, className)}
        onClick={handleClick}
      >
        {children}
      </div>
    );
  }
);
