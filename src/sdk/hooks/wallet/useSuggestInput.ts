import { FixedPointNumber as FN, Token } from '@acala-network/sdk-core';
import { SubmittableExtrinsic } from '@polkadot/api/types';
import { ISubmittableResult } from '@polkadot/types/types';
import { SDKNetwork } from '@sdk/types';
import { useState } from 'react';
import { switchMap } from 'rxjs';
import { useWallet } from '.';
import { usePresetTokens } from '..';
import { useApi } from '../../../connector';
import { useSubscription } from '../../../hooks/useSubscription';

export const useSuggestInput = (
  network: SDKNetwork,
  address: string,
  token: Token,
  isAllowDeath = false,
  call: SubmittableExtrinsic<'rxjs', ISubmittableResult>
) => {
  const [data, setData] = useState<FN>();
  const api = useApi(network);
  const wallet = useWallet(network);
  const { nativeToken } = usePresetTokens(network);

  useSubscription(() => {
    if (!api.api || !wallet || !call || !address || !token) return;

    return call
      .paymentInfo(address)
      .pipe(
        switchMap((paymentInfo) => {
          return wallet.subscribeSuggestInput(token, address, isAllowDeath, {
            amount: FN.fromInner(paymentInfo.partialFee.toString(), nativeToken.decimals).mul(new FN(1.2)),
            currency: nativeToken
          });
        })
      )
      .subscribe({ next: setData });
  }, [api, wallet, call, address, token, isAllowDeath]);

  return data;
};
