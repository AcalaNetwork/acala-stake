import { FixedPointNumber, MaybeCurrency } from '@acala-network/sdk-core';
import React, { FC, memo } from 'react';
import { formatBalance } from '../utils/formatBalance';
import { FormatNumber, FormatNumberProps } from './FormatNum';

export interface BalancePair {
  balance?: string | number | FixedPointNumber;
  token?: MaybeCurrency;
}

export interface FormatBalanceProps extends Omit<FormatNumberProps, 'data'> {
  placeholder?: string;
  loading?: boolean;
  balance?: BalancePair['balance'];
  token?: BalancePair['token'];
  icon?: boolean;
  decimalLength?: number;
  negativeToZero?: boolean;
}

const defaultFormatBalanceConfig: FormatNumberProps['formatNumberConfig'] = {
  decimalLength: 8,
  removeEmptyDecimalParts: true,
  removeTailZero: true,
};

const MIN = 0.0000001;

export const FormatBalance: FC<FormatBalanceProps> = memo(
  ({ balance, className, decimalLength = 6, placeholder = '-', loading, negativeToZero = true, ...other }) => {
    if (!balance) return <p>{placeholder}</p>;

    const formatedBalance = formatBalance(balance);

    const displayNumber = isFinite(formatedBalance) && formatedBalance > MIN ? formatedBalance : 0;

    let showZero = false;

    if (negativeToZero) {
      showZero = displayNumber <= 0;
    }

    const formatNumberConfig = { ...defaultFormatBalanceConfig };

    if (decimalLength) formatNumberConfig.decimalLength = decimalLength;

    return (
      <FormatNumber
        className={className}
        data={showZero ? 0 : formatedBalance || 0}
        formatNumberConfig={formatNumberConfig}
        human={false}
        loading={loading}
        {...other}
      />
    );
  }
);
