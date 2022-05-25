import { useSubscription } from '@hooks/useSubscription';
import { useIncentive, useWallet } from '@sdk';
import { useHoma } from '@sdk/hooks/homa';
import { combineLatest } from 'rxjs';
import { useMemo, useState } from 'react';
import { FixedPointNumber, Token } from '@acala-network/sdk-core';
import { useActiveAccount } from '@connector';
import { puls } from '@utils';
import { SDKNetwork } from '@sdk/types';

export interface StakeData {
  token: Token;
  chain: SDKNetwork;
  amount: FixedPointNumber;
  value: FixedPointNumber;
  estEarning: FixedPointNumber;
  apy: number;
  airdrop?: FixedPointNumber;
}

export interface OverviewData {
  overview: {
    value: FixedPointNumber;
    estEarning: FixedPointNumber;
  }
  details: StakeData[]
}

export const useAssetOverview = () => {
  const active = useActiveAccount();
  const karuraWallet = useWallet('karura');
  const acalaWallet = useWallet('acala');
  const karuraHoma = useHoma('karura');
  const acalaHoma = useHoma('acala');
  const [details, setDetails] = useState<StakeData[]>([]);
  const [overview, setOverview] = useState<OverviewData['overview']>();
  const karuraIncentive = useIncentive('karura');
  const acalaIncentive = useIncentive('acala');

  useSubscription(() => {
    if (!(karuraHoma?.consts && acalaHoma?.consts && karuraWallet && acalaWallet && active?.address)) return;

    const address = active.address;
    const { liquidToken: karuraLiquidToken, stakingToken: karuraStakingToken } = karuraHoma.consts;
    const { liquidToken: acalaLiquidToken, stakingToken: acalaStakingToken } = acalaHoma.consts;

    return combineLatest({
      acalaHomaEnv: acalaHoma.subscribeEnv(),
      karuraHomaEnv: karuraHoma.subscribeEnv(),
      acalaStakingPrice: acalaWallet.subscribePrice(acalaStakingToken),
      karuraStakingPrice: karuraWallet.subscribePrice(karuraStakingToken),
      acalaLiquidTokenBalace: acalaWallet.subscribeBalance(acalaLiquidToken, address),
      karuraLiquidTokenBalance: karuraWallet.subscribeBalance(karuraLiquidToken, address),
      karuraReward: karuraIncentive.subscribeUserIncentive(`loans-${karuraLiquidToken.name}`, active.address),
      acalaReward: acalaIncentive.subscribeUserIncentive(`loans-${acalaLiquidToken.name}`, active.address)
    }).subscribe({
      next: ({
        acalaHomaEnv,
        karuraHomaEnv,
        acalaStakingPrice,
        karuraStakingPrice,
        acalaLiquidTokenBalace,
        karuraLiquidTokenBalance,
        karuraReward,
        acalaReward
      }) => {
        const { exchangeRate: acalaExchangeRate, apy: acalaApy } = acalaHomaEnv;
        const { exchangeRate: karuraExchangeRate, apy: karuraApy } = karuraHomaEnv;

        const acalaStakingAmount = acalaExchangeRate.mul(acalaLiquidTokenBalace.available);
        const karuraStakingAmount = karuraExchangeRate.mul(karuraLiquidTokenBalance.available);

        const acalaRewardAmount = acalaExchangeRate.mul(acalaReward.shares);
        const karuraRewardAmount = karuraExchangeRate.mul(karuraReward.shares);

        const acalaStakingValue = acalaStakingPrice.mul(acalaStakingAmount || FixedPointNumber.ZERO);
        const karuraStakingValue = karuraStakingPrice.mul(karuraStakingAmount || FixedPointNumber.ZERO);

        const acalaEstEarning = acalaStakingValue.mul(new FixedPointNumber(acalaApy));
        const karuraEstEarning = karuraStakingValue.mul(new FixedPointNumber(karuraApy));

        setDetails([
          {
            chain: 'acala',
            token: acalaStakingToken,
            amount: acalaStakingAmount.add(acalaRewardAmount),
            value: acalaStakingValue,
            apy: acalaApy,
            estEarning: acalaEstEarning,
          },
          {
            chain: 'karura',
            token: karuraStakingToken,
            amount: karuraStakingAmount.add(karuraRewardAmount),
            value: karuraStakingValue,
            apy: karuraApy,
            estEarning: karuraEstEarning,
          },
        ]);

        setOverview({
          value: puls(acalaStakingValue, karuraStakingValue),
          estEarning: puls(acalaEstEarning, karuraEstEarning)
        });
      },
    });
  }, [karuraHoma, karuraHoma?.consts, acalaHoma?.consts, acalaHoma, karuraWallet, acalaWallet, active?.address, karuraIncentive, acalaIncentive]);

  return useMemo(() => ({ overview, details }), [details, overview]);
};
