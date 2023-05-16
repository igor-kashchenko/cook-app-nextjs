import { configureStore } from '@reduxjs/toolkit';
import mealsSlice from './meals';

export const store = configureStore({
  reducer: {
    meals: mealsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
