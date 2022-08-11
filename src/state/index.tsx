import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { application } from './application/slice';

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
  application: persistReducer(applicationPersistConfig, application.reducer),
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

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from './hooks';
export * from './application/hooks';
export * from './application/types';