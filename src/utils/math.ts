import { FixedPointNumber } from "@acala-network/sdk-core";

export const finate = (a: FixedPointNumber) => a.isFinaite() ? a : FixedPointNumber.ZERO;

export const puls = (a: FixedPointNumber, b: FixedPointNumber): FixedPointNumber => {
  return finate(a).plus(finate(b));
};

export const minus = (a: FixedPointNumber, b: FixedPointNumber): FixedPointNumber => {
  return finate(a).minus(finate(b));
};

export const mul = (a: FixedPointNumber, b: FixedPointNumber): FixedPointNumber => {
  return finate(a).mul(finate(b));
};

export const div = (a: FixedPointNumber, b: FixedPointNumber): FixedPointNumber => {
  return finate(a).div(finate(b));
};