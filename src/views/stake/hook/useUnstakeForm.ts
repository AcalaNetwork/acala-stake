import { FixedPointNumber } from '@acala-network/sdk-core';
import { useCallback, useMemo } from 'react';
import { useActiveAccount } from '@connector';
import { useBalance } from '@sdk';
import { useHomaConts, useHomaEnv, useHomaRedeemRequesting } from '@sdk/hooks/homa';
import { SDKNetwork } from '@sdk/types';
import { useBoolean, useInput } from '@hooks';

export const useUnstakeForm = (network: SDKNetwork) => {
  const homaConts = useHomaConts(network);
  const { liquidToken } = homaConts;
  const { value: isFastRedeem, update: setIsFastRedeem } = useBoolean(false);
  const active = useActiveAccount();
  const env = useHomaEnv(network);

  const redeemRequesting = useHomaRedeemRequesting(network, active.address);
  const liquidBalance = useBalance(network, active.address, liquidToken);

  const maxAmount = useMemo(() => {
    if (!liquidBalance || !redeemRequesting?.amount) return FixedPointNumber.ZERO;

    return liquidBalance.add(redeemRequesting.amount);
  }, [redeemRequesting, liquidBalance]);

  const minAmount = useMemo(() => {
    if (!env) return FixedPointNumber.ZERO;

    return env.redeemThreshold;
  }, [env]);

  const { value: amount, error: amountError, onChange: onAmountChange } = useInput({
    type: 'number',
    rules: [
      {
        type: 'number',
        min: minAmount.toNumber(),
        max: maxAmount.toNumber(),
        required: true
      }
    ]
  });

  const onMaxAmount = useCallback(() => {
    onAmountChange(maxAmount.toString());
  }, [maxAmount, onAmountChange]);

  return {
    amount,
    onAmountChange,
    onMaxAmount,
    amountError,
    maxAmount,
    minAmount,
    isFastRedeem,
    setIsFastRedeem,
  };
};
