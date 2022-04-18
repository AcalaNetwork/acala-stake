import { FixedPointNumber } from '@acala-network/sdk-core';

export const eliminateGap = (
  target: FixedPointNumber,
  max: FixedPointNumber,
  gap: FixedPointNumber = new FixedPointNumber('0.000001')
): FixedPointNumber => {
  const _gap = target.minus(max);

  // target is larger than max, but not large enough
  if (_gap.isGreaterThan(FixedPointNumber.ZERO) && _gap.lt(gap)) {
    return max;
  }

  // target is smaller than max, but not small enough.
  if (_gap.lt(FixedPointNumber.ZERO) && _gap.abs().lt(gap)) {
    return max;
  }

  return target;
};
