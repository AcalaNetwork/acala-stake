import { FixedPointNumber } from '@acala-network/sdk-core';
import { AccountId } from '@acala-network/types/interfaces';
import { useEffect, useMemo, useState } from 'react';

import { SubmittableExtrinsic } from '@polkadot/api/types';
import { assert } from '@polkadot/util';
import { useApi } from '.';
import { useSubscription } from '../../hooks/useSubscription';
import { usePresetTokens } from './usePresetTokens';
import { SDKNetwork } from '@sdk/types';
import { TokenAmount } from '@connector/types';
import { useMemoized } from '@hooks';
import { useActiveAccount } from './useActiveAccount';

export interface ExtrinsicConfigs {
  section: string;
  method: string;
  params: any[] | null | undefined;
  network: SDKNetwork;
}

export interface CallInfo {
  isLoadingFee: boolean;
  fee: TokenAmount;
  call: SubmittableExtrinsic<'rxjs'> | undefined;
}

export const useExtrinsic = (_data?: ExtrinsicConfigs): CallInfo => {
  const data = useMemoized(_data);
  const api = useApi(data.network);
  const [isLoadingFee, setIsLoadingFee] = useState<boolean>(false);
  const [fee, setFee] = useState<FixedPointNumber>(FixedPointNumber.ZERO);
  const [call, setCall] = useState<CallInfo['call']>();
  const nativeToken = usePresetTokens(data.network)?.nativeToken;
  const feeDecimal = nativeToken?.decimals;
  const active = useActiveAccount();

  const buildCall = useMemo(() => {
    return (section: string, method: string, params: ExtrinsicConfigs['params']): CallInfo['call'] => {
      if (!api.api || !data) return;

      const fn = api.api.tx[section][method];

      assert(fn, `api.tx.${section}.${method} doesn't exists`);

      const call = fn.apply(api, params);

      return call;
    };
  }, [api, data]);

  const getFee = useMemo(() => {
    return (call: CallInfo['call']) => {
      if (!call || !call.paymentInfo || !active?.address) {
        setIsLoadingFee(false);

        return;
      }

      setIsLoadingFee(true);

      const account = active.address.toString();

      return call.paymentInfo(account).subscribe({
        error: () => setIsLoadingFee(false),
        next: (data) => {
          setIsLoadingFee(false);
          setFee(FixedPointNumber.fromInner(data.partialFee.toString(), feeDecimal));
        },
      });
    };
  }, [active?.address, feeDecimal]);

  // try to build call, set call to null if build failed
  useEffect(() => {
    if (!data) return;

    try {
      const call = buildCall(data.section, data.method, data.params);

      setCall(call);
    } catch (e) {
      setCall(undefined);
    }
  }, [data, setCall, buildCall]);

  // try to get fee data
  useSubscription(() => {
    if (!call) return;

    return getFee(call);
  }, [call]);

  return useMemo(
    () => ({
      call,
      fee: {
        amount: fee,
        token: nativeToken,
      },
      isLoadingFee,
    }),
    [call, fee, isLoadingFee, nativeToken]
  );
};
