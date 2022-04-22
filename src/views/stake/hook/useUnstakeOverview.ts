import { useActiveAccount } from '@connector';
import { useHomaRedeemRequesting } from '@sdk/hooks/homa';
import { SDKNetwork } from '@sdk/types';
import { useBalanceOverview } from './useBalanceOverview';

export const useUnstakeOverview = (network: SDKNetwork) => {
  const active = useActiveAccount();
  const requesting = useHomaRedeemRequesting(network, active?.address);
  const { liquidBalance } = useBalanceOverview(network);

  return {
    transferable: liquidBalance,
    requesting,
  };
};
