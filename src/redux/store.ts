import { configureStore } from '@reduxjs/toolkit';
import sectionsSlice from './sections-slice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

interface RootStateType {
  section: ReturnType<typeof sectionsSlice>;
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['section'],
};

const rootReducer = combineReducers({
  section: sectionsSlice,
});

const persistedReducer = persistReducer<RootStateType>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;