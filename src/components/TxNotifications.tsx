import React, { useEffect } from 'react';
import { useCallQueue } from '../connector/hooks/useCallQueue';
import { SendSatuts } from '../connector/types';
import { useNotification } from '../notification';
import { Loading } from './Loading';

export const TxNotifications = () => {
  const queue = useCallQueue();
  const { success, error, info } = useNotification();

  useEffect(() => {
    queue.forEach((item) => {
      if (item.status === SendSatuts.pending) {
        info({
          closeable: true,
          duration: null,
          icon: <Loading />,
          key: item.trackId,
          message: 'waiting signed',
          /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
          title: item.message || `${item.call.method.method}-${item.call.method.section}`,
        });
      }

      if (item.status === SendSatuts.sending) {
        info({
          closeable: true,
          duration: null,
          key: item.trackId,
          message: item.hash,
          /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
          title: item.message || `${item.call.method.method}-${item.call.method.section}`,
        });
      }

      if (item.status === SendSatuts.failed) {
        error({
          closeable: true,
          duration: 3000,
          icon: null, // use default icon
          key: item.trackId,
          message: '', // clear mesasge
          /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
          title: item.message || `${item.call.method.method}-${item.call.method.section} Failed`,
        });
      }

      if (item.status === SendSatuts.success) {
        success({
          closeable: true,
          duration: 3000,
          icon: null, // use default icon
          key: item.trackId,
          message: item.hash,
          /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
          title: item.message || `${item.call.method.method}-${item.call.method.section} Success`,
        });
      }
    });
  }, [queue, info, error, success]);

  return null;
};
