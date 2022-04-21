import { HomaEnvironment, UserLiquidityTokenSummary } from '@acala-network/sdk/homa/types';
import { useEffect, useState } from 'react';
import { useHoma } from '@sdk/hooks/homa';
import { useActiveAccount, useApi } from '@connector';
import { useSubscription } from '@hooks';
import { formatBalance } from '@utils';
import { SDKNetwork } from '@sdk/types';
import dayjs from 'dayjs';

const useQueryHomaLiquidTokenSummary = () => {
  const [data, setData] = useState<UserLiquidityTokenSummary>();
  const homa = useHoma();
  const account = useActiveAccount();

  useSubscription(() => {
    if (!homa || !account) return;

    return homa.subscribeUserLiquidTokenSummary(account.address).pipe(
    ).subscribe({
      next: setData
    });
  }, [homa, account, setData]);

  return data;
};

interface LTokenSummaryProps {
  action: string;
  Est: string;
  status: string;
}

export const useHomaLiquidTokenSummary = (network: SDKNetwork) => {
  const { api } = useApi(network);
  const summary = useQueryHomaLiquidTokenSummary();
  const homa = useHoma(network);
  const [env, setEnv] = useState<HomaEnvironment>();
  const [result, setResult] = useState<LTokenSummaryProps[]>([]);

  useSubscription(() => {
    if (!homa) return;

    return homa.subscribeEnv().subscribe({ next: setEnv });
  }, [homa, setEnv]);

  useEffect(() => {
    const _data: LTokenSummaryProps[] = [];
    if (summary?.redeemRequest.amount.isZero()) {
      _data.push({
        action: `Request ${formatBalance(summary.redeemRequest.amount)} ${homa.consts.liquidToken.display}`,
        Est: dayjs().add(
          Number(api.consts.homa?.bondingDuration.toString() || 0) * (env?.eraFrequency || 0) * 6000,
          'millisecond'
        ).format('DD, MMM, YYYY'),
        status: 'Request'
      });
    }

    if (summary?.unbondings && summary?.unbondings.length > 0) {
      summary?.unbondings.map(item => {
        _data.push({
          action: `Unbonding ${formatBalance(item.amount)} ${homa.consts.stakingToken.display}`,
          Est: `${dayjs().add(
            (item.era - (summary?.currentRelayEra || 0)) * (env?.eraFrequency || 0) * 6000,
            'millisecond'
          ).format('DD, MMM, YYYY')}, Unbonding At ${item.era} ERA`,
          status: 'Unbonding'
        });
      });
    }

    setResult(_data);
  }, [api.consts.homa?.bondingDuration, env, homa.consts, summary]);

  return result;
};
