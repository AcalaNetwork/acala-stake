import { uniqueId } from 'lodash';
import React, { useCallback, useEffect, useMemo, useReducer } from 'react';
import { NotificationContainer } from './NotificationContainer';
import { NotificationContextData, NotificationData } from '../types';

export const Context = React.createContext<NotificationContextData>({
  data: []
} as unknown as NotificationContextData);

const INIT_STATE = {
  data: []
} as { data: NotificationData[] };

interface NotificationState {
  data: NotificationData[];
}

type NotificationActions = { type: 'insert-or-update-notification', data: Partial<NotificationData> & { key: string } }
| { type: 'dismiss-notification', data: string }
| { type: 'dismiss-all' };

const reducer = (state: NotificationState, action: NotificationActions) => {
  switch (action.type) {
    case 'insert-or-update-notification': {
      let index = state.data.findIndex((item) => item.key === action.data.key)

      // update
      if (index !== -1) {
        state.data[index] = {
          ...state.data[index],
          ...action.data
        }

        return { data: [...state.data] }
      }

      // insert
      return {
        data: [...state.data, action.data]
      }
    }

    case 'dismiss-notification': {
      let index = state.data.findIndex((item) => item.key === action.data);

      if(index !== undefined) {
        state.data.splice(index, 1);

        return { data: [...state.data] }
      }

      return state;
    }

    case 'dismiss-all': {
      return { data: [] }
    }
  }
}

const dismissTracker: Record<string, NodeJS.Timeout> = {};

export const NotificationProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const update = useCallback((data: Omit<NotificationData, 'key'> & { key?: string }) => {
    const key = data?.key || uniqueId('notification');
    const newData = { ...data, key };
    
    dispatch({ type: 'insert-or-update-notification', data: newData });

    return newData;
  }, [dispatch]);

  const success = useCallback((data: NotificationData) => {
    return update({ ...data, type: 'success' });
  }, [update]);

  const error = useCallback((data: NotificationData) => {
    return update({ ...data, type: 'error' });
  }, [update]);

  const info = useCallback((data: NotificationData) => {
    return update({ ...data, type: 'info' });
  }, [update]);

  const dismiss = useCallback((key: string) => {
    dispatch({ type: 'dismiss-notification', data: key });
  }, [dispatch]);

  const dismissAll = useCallback(() => {
    dispatch({ type: 'dismiss-all' });
  }, [dispatch]);

  useEffect(() => {
    state.data.forEach(({ key, duration }) => {
      if (!dismissTracker[key] && duration) {
        dismissTracker[key] = setTimeout(() => {
          dispatch({ type: 'dismiss-notification', data: key });
  
          // clear
          clearTimeout(dismissTracker[key]);
          delete dismissTracker[key];
        }, duration);
      }

      if (dismissTracker[key] && duration === null) {
          clearTimeout(dismissTracker[key]);
          delete dismissTracker[key];
      }
    });
  }, [state, dispatch]);

  const contextData = useMemo(() => ({
    ...state,
    update,
    error,
    info,
    success,
    dismiss,
    dismissAll
  }), [update, state, dismiss, dismissAll, error, info, success]);

  return (
    <Context.Provider value={contextData}>
      {children}
      <NotificationContainer />
    </Context.Provider>
  );
};
