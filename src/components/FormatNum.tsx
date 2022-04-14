import { FixedPointNumber } from "@acala-network/sdk-core";
import { format as d3format } from "d3";
import React, { FC, memo, useMemo } from "react";
import { formatNumber, FormatNumberConfig } from "../utils/formatNumber";

const humanFormat = d3format("~s");

export type FormatNumberProps = {
	data: number | string | FixedPointNumber | undefined;
	formatNumberConfig?: FormatNumberConfig;
	withTooltips?: boolean;
	human?: boolean;
	loading?: boolean;

	prefix?: string;
	suffix?: string;
	className?: string;
  placeholder?: string;
};

export const FormatNumber: FC<FormatNumberProps> = memo(
  ({
    className,
    data,
    formatNumberConfig,
    human = false,
    loading = false,
    prefix = "",
    suffix = "",
  }) => {
    const [i, d] = useMemo(() => {
      return human && Number(data?.toString()) > 1000
        ? [
          humanFormat(Number(data?.toString() || "0"))
            .replace("G", "B")
            .replace("k", "K"),
          "",
        ]
        : formatNumber(data, formatNumberConfig).split(".");
    }, [data, formatNumberConfig, human]);

    return (
      <span className={`whitespace-nowrap	${className}`}>
        {loading ? (
          <span className="animate-pulse bg-d6d3de text-d6d3de">000</span>
        ) : (
          <span>
            {prefix ? <span>{prefix}</span> : null}
            {i ? <span>{i}</span> : null}
            {d ? <span>.{d}</span> : null}
            {suffix && i !== "N/A" ? <span>{suffix}</span> : null}
          </span>
        )}
      </span>
    );
  }
);

FormatNumber.displayName = "FormatNumber";
