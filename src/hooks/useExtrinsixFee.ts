import { FixedPointNumber } from '@acala-network/sdk-core';
import { AccountId } from '@acala-network/types/interfaces';
import throttle from 'lodash/throttle';
import { useMemo, useState } from 'react';

import { SubmittableExtrinsic } from '@polkadot/api/types';

import { useMemoized } from './useMemoized';
import { useSubscription } from './useSubscription';
import { useActiveAccount } from '@connector';

interface ExtrinsicData {
  account?: string | AccountId;
  call?: SubmittableExtrinsic<'rxjs'>;
  decimal?: number
}
interface UseExtrinsicReturnType {
  isLoadingFee: boolean;
  fee: FixedPointNumber;
}

export const useExtrinsicFee = (data: ExtrinsicData): UseExtrinsicReturnType => {
  const active = useActiveAccount();
  const _data = useMemoized(data);
  const [isLoadingFee, setIsLoadingFee] = useState<boolean>(false);
  const [fee, setFeeData] = useState<FixedPointNumber>(FixedPointNumber.ZERO);
  const { call } = data;

  const getFee = useMemo(() => {
    return throttle((call: ExtrinsicData['call'], data: ExtrinsicData) => {
      if (!call || !call.paymentInfo || !(data.account || active?.address)) {
        setIsLoadingFee(false);

        return;
      }

      setIsLoadingFee(true);

      const account = data.account ?? active?.address ?? '';

      return call.paymentInfo(account as any).subscribe({
        error: () => {
          setIsLoadingFee(false);
        },
        next: (result) => {
          setIsLoadingFee(false);
          setFeeData(FixedPointNumber.fromInner(result.partialFee.toString(), data?.decimal || 12));
        }
      });
    });
  }, [active]);

  // try to get fee data
  useSubscription(() => {
    if (!call) return;

    return getFee(call, _data);
  }, [call, _data]);

  return { fee, isLoadingFee };
};
