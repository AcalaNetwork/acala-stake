import { useRouter } from "next/router";
import React, { FC, useCallback } from "react";

type ButtonVariant = "outline" | "text" | "filled";
type ButtonSize = "sm" | "default" | "lg";
type ButtonColor = "primary" | "gradient-primary";
type ButtonRoundSize = "sm" | "default" | "lg" | "full";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	variant?: ButtonVariant;
	size?: ButtonSize;
	color?: ButtonColor;
	disabled?: boolean;
	round?: ButtonRoundSize;
	error?: boolean;
}

function getClassName(
  error: boolean,
  variant: ButtonVariant,
  size: ButtonSize,
  color: ButtonColor,
  round: ButtonRoundSize
) {
  const base = "round transition-all";

  const sizes = {
    sm: "text-14 leading-17 py-10 px-24 font-medium ",
    default: "text-base pt-14 pb-14 pl-24 pr-24 font-semibold",
  };

  const colors = {
    "filled-primary": "bg-primary text-fff",
    "filled-gradient-primary": "bg-gradient-primary text-fff",
    "text-primary": "bg-translated text-primary",
    "outline-primary": "border border-primary text-primary",
    error: "bg-e40c5b text-fff",
  };

  const roundConfigs = {
    lg: "rounded-16",
    sm: 'rounded-12',
    full: "rounded-full",
  };

  const colorClass = colors[error ? 'error' : [variant, color].join('-')];

  return `${base} ${sizes[size]} ${colorClass} ${roundConfigs[round]}`;
}

export const Button: FC<ButtonProps> = ({
  color = "primary",
  className,
  children,
  error = false,
  size = "default",
  variant = "filled",
  round = "sm",
  ...rest
}) => {
  return (
    <button
      className={`${getClassName(
        error,
        variant,
        size,
        color,
        round
      )} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

interface ButtonGroupProps {
	spacing?: number;
	className?: string;
}

export const ButtonGroup: FC<ButtonGroupProps> = React.memo(({
  className,
  spacing = 36,
  children
}) => {
  return (
    <div className={`${className} flex`}
      style={{ columnGap: spacing }}>
      {children}
    </div>
  );
});

export const LinkButton: FC<ButtonProps & { href?: string }> = React.memo(({ href, onClick, ...rest }) => {
  const router = useRouter();

  const handleLink = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }
    if (href) {
      router.push(href);
    }
  }, [href, onClick]);

  return <Button {...rest}
    onClick={handleLink} />;
});