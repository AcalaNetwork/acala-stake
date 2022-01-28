import { useContext, useMemo } from 'react';
import { Context } from '../components/NotificationProvider';

import { NotificationContextData } from '../types';

type NotificationData = Pick<NotificationContextData, 'update' | 'success' | 'info' | 'error' | 'dismiss' | 'dismissAll'>;

export const useNotificationContext = (): NotificationContextData => {
  const data = useContext(Context);

  return data;
};

export const useNotification = (): NotificationData => {
  const data = useContext(Context);

  return useMemo(() => ({
    update: data.update,
    dismiss: data.dismiss,
    dismissAll: data.dismissAll,
    error: data.error,
    info: data.info,
    success: data.success
  }), [data.update, data.success, data.info, data.error, data.dismiss, data.dismissAll]);
};
