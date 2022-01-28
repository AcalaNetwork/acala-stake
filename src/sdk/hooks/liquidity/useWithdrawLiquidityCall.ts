import { useActiveAccount, useExtrinsic } from "../../../connector";

export const useWithdrawLiquidityCall = (params: any[]) => {
  const active = useActiveAccount();
  const [call, fee] = useExtrinsic({
    account: active?.address,
    section: "dex",
    method: 'removeLiquidity',
    params: params,
  });

  return [call, fee] as const
}