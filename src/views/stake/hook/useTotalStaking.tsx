import { useState, useEffect } from "react";
import { FixedPointNumber, Token } from "@acala-network/sdk-core";
import { SDKNetwork } from "@sdk/types";
import { useHomaConts } from "@sdk/hooks/homa";
import { usePrice } from "@sdk";
import { useHomaTotalStaking } from "@sdk/hooks/homa/useHomaTotalStaking";

export const useTotalStaking = (network: SDKNetwork) => {
  const total = useHomaTotalStaking(network);
  const consts = useHomaConts(network);
  const price = usePrice(network, consts.stakingToken);

  const [result, setResult] = useState<{
    token: Token;
    amount: FixedPointNumber;
    value: FixedPointNumber;
  } | undefined>();

  useEffect(() => {
    if (!price || !total || !consts.stakingToken) return;

    setResult({
      token: consts.stakingToken,
      amount: total,
      value: total.mul(price),
    });
  }, [consts.stakingToken, price, total]);

  return result;
};
