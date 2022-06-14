import { Token } from "@acala-network/sdk-core";
import { useActiveAccount } from "@connector";
import { useInput } from "@hooks";
import { useBalance } from "@sdk";
import { useHomaEnv } from "@sdk/hooks/homa";
import { SDKNetwork } from "@sdk/types";
import { useMemo } from "react";

interface UseStakeInputConfigs {
  network: SDKNetwork;
  stakingToken: Token;
}

export const useStakeInput = ({ network, stakingToken }: UseStakeInputConfigs) => {
  const active = useActiveAccount();
  const env = useHomaEnv(network);
  const balance = useBalance(network, active?.address, stakingToken);

  const inputProps = useInput({
    type: 'number',
    rules: [{
      type: 'number',
      max: balance?.toNumber() || 0,
      min: env?.mintThreshold.toNumber(),
    }]
  });

  return useMemo(() => ({
    inputProps,
    configs: {
      max: balance?.toNumber(),
      min: env?.mintThreshold.toNumber(),
    }
  }), [inputProps, balance, env?.mintThreshold]);
};

export type StakingInputData = ReturnType<typeof useStakeInput>;