import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../components/Types/Types";

type PostsState = {
  data: Post[];
  isLoading: boolean;
  isError: boolean;
};

// Using any here due to an issue with types and redux-toolkit
export const fetchPosts: any = createAsyncThunk("fetchPosts", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const apiData: Post[] = await response.json();
  return apiData;
});

const initialState: PostsState = {
  data: [],
  isLoading: false,
  isError: false,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(
      fetchPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.isError = false;
        state.isLoading = false;
        state.data = action.payload;
      }
    );
  },
});

export const actions = postSlice.actions;

export default postSlice.reducer;
