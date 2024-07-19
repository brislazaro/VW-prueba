import { configureStore } from "@reduxjs/toolkit";
import toDosSliceReducer from "./slices/toDosSlice";

export const store = configureStore({
  reducer: {
    toDos: toDosSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
