import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';
import authReducer from './authSlice';
import { postsApi } from './postsApi';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
