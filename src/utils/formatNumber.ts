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

export const format = (data: number | string | undefined, decimalLength = 4, prefix?: string): string => {
  if( data == undefined) return '0';
  if (data === 0 || data === '0') return '0';

  if (!data) return '-';
  
  if (Number(data) < 0.001 && Number(data) > 0) {
    return '<0.001';
  }

  let num = '';
  let postfix = '';

  if(Number(data) >= 1000000000) {
    num = (Number(data) / 1000000000).toFixed(2);
    postfix = 'B';
  } else if (Number(data) >= 1000000) {
    num = (Number(data) / 1000000).toFixed(2);
    postfix = 'M';
  } else if (Number(data) > 1000) {
    num = (Number(data) / 1000).toFixed(2);
    postfix = 'k';
  } else {
    num = Number(data).toFixed(4);
  }

  const {integer, decimals, negative} = formatSpacedNumber(num);

  return `${negative ? '-' : ''}${prefix || ''}${integer}${decimalLength > 0 ? '.' : ''}${decimals.length <= decimalLength ? decimals : decimals.slice(0, decimalLength)}${postfix}`;
};

const formatSpacedNumber = (num: string) => {
  const _num = num.startsWith('-') ? num.slice(1) : num;
  const [integer, decimals] = _num.toString().split('.');
  let res = '';

  integer.split('').reverse().map((number, index) => {
    if((index + 1) % 3 === 0) {
      if(index === integer.length -1 ) {
        res = `${number}${res}`;
      } else {
        res = `,${number}${res}`;
      }
    } else {
      res = `${number}${res}`;
    }
  });

  return {
    negative: num.startsWith('-'),
    integer: res,
    decimals: decimals
  };
};