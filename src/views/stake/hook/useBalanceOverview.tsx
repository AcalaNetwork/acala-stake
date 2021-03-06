import { useBalance } from '../../../sdk';
import { useHomaAPY, useHomaConts } from '../../../sdk/hooks/homa';
import { useActiveAccount } from '../../../connector';
import { FixedPointNumber, Token } from '@acala-network/sdk-core';
import { SDKNetwork } from '@sdk/types';
import { useAPY } from './useAPY';

interface BalanceOverview {
  stakingBalance: FixedPointNumber;
  liquidBalance: FixedPointNumber;
  apy: number;
  liquidToken: Token;
  stakingToken: Token;
}

export const useBalanceOverview = (network: SDKNetwork): BalanceOverview => {
  const active = useActiveAccount();
  const consts = useHomaConts(network);
  const stakingBalance = useBalance(network, active?.address, consts.stakingToken, 'available');
  const liquidBalance = useBalance(network, active?.address, consts.liquidToken, 'available');
  const { liquidToken, stakingToken } = consts;
  const {apy} = useAPY(network, liquidToken)

  return {
    stakingBalance,
    liquidBalance,
    apy,
    liquidToken,
    stakingToken,
  };
};
