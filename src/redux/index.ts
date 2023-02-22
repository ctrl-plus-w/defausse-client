import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import type { ThunkAction, Action } from '@reduxjs/toolkit';

import { notificationsSlice } from '@slice/notificationsSlice';

const makeStore = () =>
  configureStore({
    reducer: {
      [notificationsSlice.name]: notificationsSlice.reducer,
    },
    devTools: process.env.NODE_ENV === 'development',
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);
