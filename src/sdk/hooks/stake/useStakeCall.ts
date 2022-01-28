import { FixedPointNumber } from "@acala-network/sdk-core";
import { useMemo } from "react";
import { useActiveAccount, useApi, useExtrinsic } from "../../../connector";
import { eliminateGap } from "../../../utils/eliminateGap";

export const useStakeCall = (params: any[]) => {
  const active = useActiveAccount();

  const [call, fee] = useExtrinsic({
    account: active?.address,
    section: "utility",
    method: 'batchAll',
    params: params,
  });

  return [call, fee] as const
}