import { configureStore } from '@reduxjs/toolkit';
import PageSlice from './PageDataSlice';

export const store = configureStore({
  reducer: {
    pageData: PageSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
