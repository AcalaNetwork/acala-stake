import { FixedPointNumber } from "@acala-network/sdk-core";

export const formatRatio = (data?: number | string | FixedPointNumber, decimals = 2) => {
  if(!data) return '0%';
  let string = '';
  if(typeof data === 'number') {
    string = (data * 100).toString();
  } else if(typeof data === 'string') {
    string = (Number(data) * 100).toString();
  } else {
    string = data.times(new FixedPointNumber(100)).toString();
  }

  const [integer, decimal] = string.split('.');

  return `${integer}${decimal ? (decimal.length > decimals ? `.${decimal.slice(0, decimals)}` : decimal) : ''}%`;
};