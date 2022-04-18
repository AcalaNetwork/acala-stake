import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createFilter from 'redux-persist-transform-filter';

import { applicationReducer } from './application/reducers';

const storageFilter = createFilter('application.selectedAddress');

const persistConfig: any = {
  key: 'root',
  storage,
  transform: [storageFilter],
};

const reducers = combineReducers({
  application: applicationReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

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

// reexport all usefull hooks and components
export * from './application/hooks';
