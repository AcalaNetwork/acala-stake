import { Token } from "@acala-network/sdk-core";
import { ExtrinsicConfigs, useExtrinsic } from "@connector";
import { SDKNetwork } from "@sdk/types";
import { useMemo } from "react";

export const useClaimIncentiveCall = (network: SDKNetwork, token: Token) => {
  const params = useMemo((): ExtrinsicConfigs => {
    if (!network || !token) return undefined;

    return {
      network,
      section: 'incentives',
      method: 'claimRewards',
      params: [
        {
          Loans: token.toChainData()
        }
      ]
    };
  }, [network, token]);

  return useExtrinsic(params);
};