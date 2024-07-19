import { createSlice } from "@reduxjs/toolkit";
import { Todo } from "../../components/Types/Types";

type ToDosState = {
  toDos: Todo[];
  isLoading: boolean;
  isError: boolean;
};

const initialState: ToDosState = {
  toDos: [],
  isLoading: false,
  isError: false,
};

const toDosSlice = createSlice({
  name: "toDos",
  initialState,
  reducers: {},
});

export const actions = toDosSlice.actions;

export default toDosSlice.reducer;
