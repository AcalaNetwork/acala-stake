import { useSubscription } from '@hooks/useSubscription';
import { useWallet } from '@sdk';
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
    }).subscribe({
      next: ({
        acalaHomaEnv,
        karuraHomaEnv,
        acalaStakingPrice,
        karuraStakingPrice,
        acalaLiquidTokenBalace,
        karuraLiquidTokenBalance,
      }) => {
        const { exchangeRate: acalaExchangeRate, apy: acalaApy } = acalaHomaEnv;
        const { exchangeRate: karuraExchangeRate, apy: karuraApy } = karuraHomaEnv;

        const acalaStakingAmount = acalaExchangeRate.mul(acalaLiquidTokenBalace.available);
        const karuraStakingAmount = karuraExchangeRate.mul(karuraLiquidTokenBalance.available);

        const acalaStakingValue = acalaStakingPrice.mul(acalaStakingAmount || FixedPointNumber.ZERO);
        const karuraStakingValue = karuraStakingPrice.mul(karuraStakingAmount || FixedPointNumber.ZERO);

        const acalaEstEarning = acalaStakingValue.mul(new FixedPointNumber(acalaApy));
        const karuraEstEarning = karuraStakingValue.mul(new FixedPointNumber(karuraApy));

        setDetails([
          {
            chain: 'acala',
            token: acalaStakingToken,
            amount: acalaStakingAmount,
            value: acalaStakingValue,
            apy: acalaApy,
            estEarning: acalaEstEarning,
          },
          {
            chain: 'karura',
            token: karuraStakingToken,
            amount: karuraStakingAmount,
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
  }, [karuraHoma, karuraHoma?.consts, acalaHoma?.consts, acalaHoma, karuraWallet, acalaWallet, active?.address]);

  return useMemo(() => ({ overview, details }), [details, overview]);
};
