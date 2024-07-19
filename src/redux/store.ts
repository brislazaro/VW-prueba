import { configureStore } from "@reduxjs/toolkit";
import postsSliceReducer from "./slices/postsSlice";

export const store = configureStore({
  reducer: {
    posts: postsSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
