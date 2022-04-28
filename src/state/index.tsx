import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { applicationReducer } from './application/reducers';

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['application']
};

const applicationPersistConfig = {
  key: 'application',
  storage,
  blacklist: ['modal']
};

const reducers = combineReducers({
  application: persistReducer(applicationPersistConfig, applicationReducer),
});

const persistedReducer = persistReducer(rootPersistConfig, reducers);

export const store = configureStore({
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type StoreState = ReturnType<typeof store.getState>;

export type StoreDispatch = typeof store.dispatch;

// reExport all usefull hooks and components
export * from './application/hooks';
export * from './application/types';
