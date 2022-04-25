import { useContext, useEffect } from 'react';
import { ConnectorContext } from '..';
import { useActiveAccount } from '../hooks/useActiveAccount';
import { SendSatuts, SubmitData } from '../types';
import { switchMap, tap, map, finalize } from 'rxjs/operators';
import { SubmittableExtrinsic } from '@polkadot/api/types';
import { ApiRx, SubmittableResult } from '@polkadot/api';
import { ISubmittableResult, ITuple } from '@polkadot/types/types';
import { DispatchError } from '@polkadot/types/interfaces';
import { has, remove } from 'lodash';

const MAX_TX_WAITING_TIME = 60 * 1000;

const extractEvents = (result: SubmittableResult, api: ApiRx): { isDone: boolean; errorMessage?: string } => {
  const events = result.events.filter((event): boolean => !!event.event);

  for (const {
    event: { data, method, section },
  } of events) {
    // extrinsic success
    if (section === 'system' && method === 'ExtrinsicSuccess') {
      return { isDone: true };
    }

    // extrinsic failed
    if (section === 'system' && method === 'ExtrinsicFailed') {
      const [dispatchError] = data as unknown as ITuple<[DispatchError]>;
      let message = dispatchError.type;

      if (dispatchError.isModule) {
        try {
          const mod = dispatchError.asModule;
          const error = api.registry.findMetaError(new Uint8Array([mod.index.toNumber(), mod.error.toNumber()]));

          message = `${error.section}.${error.name}` as any;
        } catch (error: any) {
          message = error?.toString() || 'unknown error';
        }
      }

      return { errorMessage: message, isDone: true };
    }
  }

  return { isDone: false };
};

const filterPendingCall = (data: SubmitData) => data.status === SendSatuts.pending;

const filterFinalizeCall = (data: SubmitData) =>
  data.status === SendSatuts.failed || data.status === SendSatuts.success;

const tracker = [];

const handleResult = (result: ISubmittableResult, api: ApiRx) => {
  if (result.status.isInBlock || result.status.isFinalized) {
    const { errorMessage, isDone } = extractEvents(result, api);

    // handle extrinsic error
    if (isDone && errorMessage) {
      throw new Error(errorMessage);
    }

    return isDone;
  }
  if (result.status.isUsurped || result.status.isDropped || result.status.isFinalityTimeout) {
    throw new Error(result.status.toString());
  }

  return false;
};

const sendCall = (
  api: ApiRx,
  data: SubmitData,
  address: string,
  updater: (data: Partial<SubmitData>) => void
) => {
  // check the track list
  if (has(tracker, data.trackId)) return;

  // lock current call
  tracker.push(data.trackId);

  const { call } = data;

  const subscriber = call
    .signAsync(address, { nonce: -1 })
    .pipe(
      tap((signedTx: SubmittableExtrinsic<'rxjs'>) => {
        const hash = signedTx.hash.toString();
        // update
        updater({ trackId: data.trackId, status: SendSatuts.sending, hash });

        // onSend callback
        data.onSend && data.onSend();

        return signedTx;
      }),
      switchMap((signedTx) => signedTx.send()),
      map((result) => handleResult(result, api)),
      finalize(() => {
        // unlock current call
        remove(tracker, data.trackId);
      })
    )
    .subscribe({
      error: (error: Error) => {
        if (error.name === 'TimeoutError') {
          updater({
            trackId: data.trackId,
            status: SendSatuts.failed,
            message: 'Extrinsic timed out, Please check manually',
          });
        } else {
          updater({
            trackId: data.trackId,
            status: SendSatuts.failed,
            message: error && error.message ? error.message : 'Error Occurred!',
          });

          data.onFailed && data.onFailed();
          subscriber.unsubscribe();
        }
      },
      next: () => {
        updater({
          trackId: data.trackId,
          status: SendSatuts.success,
          message: 'Submit Transaction Success',
        });

        data.onSuccess && data.onSuccess();
        subscriber.unsubscribe();
      },
    });
};

export const SubmitHandler = () => {
  const active = useActiveAccount();
  const connector = useContext(ConnectorContext);
  const { callQueue, apis, updateTx, removeTx } = connector;

  useEffect(() => {
    if (!active) return;

    // send all pending tx
    callQueue.filter(filterPendingCall).forEach((data) => {
      const api = apis[data.network];

      if (api?.api) sendCall(api.api, data, active.address, updateTx);
    });

    // remove failed or success tx
    callQueue.filter(filterFinalizeCall).forEach((data) => removeTx(data.trackId));
  }, [callQueue, apis, updateTx, removeTx, active]);

  return null;
};
