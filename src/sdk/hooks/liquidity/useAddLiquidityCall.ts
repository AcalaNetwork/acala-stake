import { useActiveAccount, useExtrinsic } from '../../../connector';

export const useAddLiquidityCall = (params: any[]) => {
  const active = useActiveAccount();
  const [call, fee] = useExtrinsic({
    account: active?.address,
    section: 'dex',
    method: 'addLiquidity',
    params: params,
  });

  return [call, fee] as const;
};
