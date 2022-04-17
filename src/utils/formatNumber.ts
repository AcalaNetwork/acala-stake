import { FixedPointNumber } from '@acala-network/sdk-core';

export interface FormatNumberConfig {
  decimalLength: number;
  removeTailZero: boolean;
  removeEmptyDecimalParts: boolean;
}

export const thousand = (num: string | string): string => {
  const _num = num.toString();
  const reg = /(?!\b)(?=(\d{3})+\b)/g;

  return _num.replace(reg, ',');
};

export const formatNumber = (
  num: string | number | FixedPointNumber | undefined,
  config: FormatNumberConfig = {
    decimalLength: 6,
    removeEmptyDecimalParts: true,
    removeTailZero: true,
  }
): string => {
  let _num = '0';

  if (num instanceof FixedPointNumber) {
    _num = num.toString(18, 2);
  } else {
    _num = new FixedPointNumber(num || 0).toString(18, 2);
  }

  // eslint-disable-next-line prefer-const
  let [i, d] = _num.split('.');

  // test if the i is a validate number at first
  if (!/^-?[0-9]*$/.test(i)) return 'N/A';

  if (Reflect.has(config, 'decimalLength')) {
    d = (d || '').slice(0, config.decimalLength).padEnd(config.decimalLength, '0');
  }

  if (d && config.removeTailZero) {
    d = d.replace(/(\d*?)0*$/, '$1');
  }

  if (d && config.removeEmptyDecimalParts) {
    if (/^0*$/.test(d)) {
      return thousand(i);
    }
  }

  if (!d) {
    return thousand(i);
  }

  return [thousand(i), d].join('.');
};
