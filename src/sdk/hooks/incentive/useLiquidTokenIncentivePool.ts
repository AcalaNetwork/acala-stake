import { IncentiveType } from "@acala-network/sdk/incentive/types";
import { useIncentivePool, usePresetTokens } from "@sdk";
import { SDKNetwork } from "@sdk/types";

export const useLiquidTokenIncentivePool = (network: SDKNetwork) => {
  const { liquidToken } = usePresetTokens(network);
  const incentivePool = useIncentivePool(network, IncentiveType.LOANS, liquidToken);

  return incentivePool;
};