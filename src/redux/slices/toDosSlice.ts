import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../components/Types/Types";

type ToDosState = {
  toDos: Todo[];
  isLoading: boolean;
  isError: boolean;
};

// Using any here due to an issue with types and redux-toolkit
export const fetchToDos: any = createAsyncThunk("fetchToDos", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const apiData: Todo[] = await response.json();
  return apiData;
});

const initialState: ToDosState = {
  toDos: [],
  isLoading: false,
  isError: false,
};

const toDosSlice = createSlice({
  name: "toDos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchToDos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchToDos.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(
      fetchToDos.fulfilled,
      (state, action: PayloadAction<Todo[]>) => {
        state.isError = false;
        state.isLoading = false;
        state.toDos = action.payload;
      }
    );
  },
});

export const actions = toDosSlice.actions;

export default toDosSlice.reducer;
