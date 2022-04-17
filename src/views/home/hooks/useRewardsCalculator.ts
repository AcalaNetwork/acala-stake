import { useMemo } from 'react';
import { useInput } from '../../../hooks/useInput';
import { useHomaAPY } from '../../../sdk/hooks/homa/useHomaAPY';
import { SDKNetwork } from '../../../sdk/types';

export const useRewardsCalculator = (type: SDKNetwork) => {
  const apy = useHomaAPY(type);
  const [amount, { onChange }] = useInput<string>({
    init: '0',
    rules: {
      type: 'number',
      min: 0,
      max: 1000000000,
    },
  });

  return useMemo(() => {
    return [apy, (apy * Number(amount)) / 12, apy * Number(amount), amount, onChange] as const;
  }, [apy, amount, onChange]);
};
