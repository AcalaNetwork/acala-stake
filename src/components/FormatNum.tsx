import { FixedPointNumber } from '@acala-network/sdk-core';
import clsx from 'clsx';
import { format as d3format } from 'd3';
import React, { FC, memo, useMemo } from 'react';
import { formatNumber, FormatNumberConfig } from '../utils/formatNumber';

const humanFormat = d3format('~s');

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
  visiable?: boolean;
};

export const FormatNumber: FC<FormatNumberProps> = memo(
  ({ visiable = true, className, data, formatNumberConfig, human = false, loading = false, prefix = '', suffix = '' }) => {
    const num = useMemo(() => {
      return human && Number(data?.toString()) > 1000
        ? [
          humanFormat(Number(data?.toString() || '0'))
            .replace('G', 'B')
            .replace('k', 'K'),
          '',
        ]
        : formatNumber(data, formatNumberConfig);
    }, [data, formatNumberConfig, human]);

    const classNameStr = clsx('whitespace-nowrap', className);

    if (!visiable) return <span className={classNameStr}>******</span>;

    return (
      <span className={classNameStr}>
        {loading ? (
          <span className='animate-pulse bg-grey-5 text-grey-5'>000</span>
        ) : (
          <span>
            {prefix ? <span>{prefix}</span> : null}
            {num ? <span>{num}</span> : null}
            {suffix && num !== 'N/A' ? <span>{suffix}</span> : null}
          </span>
        )}
      </span>
    );
  }
);

FormatNumber.displayName = 'FormatNumber';
