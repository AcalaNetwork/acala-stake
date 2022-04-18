import { ReactNode } from 'react';

const NotificationTypeStr = ['success', 'info', 'error', 'warning'] as const;

export type NotificationType = typeof NotificationTypeStr[number];

export interface NotificationData {
  key: string;
  type?: NotificationType;
  title?: ReactNode;
  message?: ReactNode;
  duration?: number | null;
  closeable?: boolean;
  show?: boolean;
  icon?: ReactNode;
}

export interface NotificationContextData {
  data: NotificationData[];
  update: (data: Omit<NotificationData, 'key'> & { key?: string }) => NotificationData;
  success: NotificationContextData['update'];
  error: NotificationContextData['update'];
  info: NotificationContextData['update'];
  dismiss: (key: string) => void;
  dismissAll: () => void;
}
