import React, { FC, PropsWithChildren } from "react";
import { Loading } from "./Loading";

type CardRoundSize = "sm" | "default";
type CardVariant = "gradient-border" | "border";
type CardShadow = 0 | 1 | 'none';

type CardProps = PropsWithChildren<{
	className?: string;
	variant?: CardVariant;
	round?: CardRoundSize;
	loading?: boolean;
	shadow?: CardShadow;
	style?: React.CSSProperties;
}>;

function getClassName(
	round: CardRoundSize,
	variant: CardVariant,
	shadow: CardShadow
) {
	const rounds = {
		default: "rounded-xl",
	};

	const variants = {
		"gradient-border": "card-gradient-border",
		border: "border border-eae9f0",
	};

	const shadows = {
		0: "shadow",
		1: "shadow-1",
	};

	return `${rounds[round] ?? ""} relative bg-fff w-ful ${
		variants[variant] ?? ""
	} ${shadows[shadow] ?? ""}`;
}

export const Card: FC<CardProps> = ({
	className,
	children,
	variant,
	round = "default",
	loading = false,
	shadow = 1,
	style
}) => {
	const extraClassName = getClassName(round, variant, shadow);

	return (
		<div
			style={style}
			className={`${className} ${extraClassName} ${
				loading ? "overflow-hidden" : ""
			}`}
		>
			{loading ? <CardLoading /> : null}
			{children}
		</div>
	);
};

const CardLoading = () => {
	return (
		<div className="absolute z-50 top-0 left-0 w-full h-full bg-fff pointer-events-none flex items-center justify-center">
			<Loading />
		</div>
	);
};
