import { configureStore } from "@reduxjs/toolkit";
import toDosSliceReducer from "./slices/toDosSlice";

export const store = configureStore({
  reducer: {
    toDos: toDosSliceReducer,
  },
});
