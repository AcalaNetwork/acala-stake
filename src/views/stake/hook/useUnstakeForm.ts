import { FixedPointNumber  } from "@acala-network/sdk-core";
import { useCallback, useMemo } from "react";
import { useActiveAccount } from "@connector";
import { useBalance } from "@sdk";
import { useHomaConts, useHomaEnv, useHomaRedeemRequesting } from "@sdk/hooks/homa";
import { SDKNetwork } from "@sdk/types";
import { useBoolean, useInput } from "@hooks";

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

  const validator = useCallback(async (amount) => {
    if (!amount) throw new Error('Amount Is required');

    const fixedAmount = new FixedPointNumber(amount, liquidToken.decimals);

    if (fixedAmount.lt(minAmount)) {
      throw new Error(`minimum is ${minAmount.toString()}`);
    }

    if (fixedAmount.gt(maxAmount)) {
      throw new Error(`maximum is ${maxAmount.toString()}`);
    }

    return true;
  }, [liquidToken.decimals, maxAmount, minAmount]);

  const [amount, { error: amountError, onChange: onAmountChange }] = useInput<string>({
    validator
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
    setIsFastRedeem
  };
};