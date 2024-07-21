import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../components/Types/Types";

type PostsState = {
  data: Post[];
  isLoading: boolean;
  isError: boolean;
  isLoadingEdit: boolean;
  isErrorEdit: boolean;
};

// Using any here due to an issue with types and redux-toolkit
export const fetchPosts: any = createAsyncThunk("fetchPosts", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const apiData: Post[] = await response.json();
  return apiData;
});

export const editPost: any = createAsyncThunk(
  "editPost",
  async (updatedPost: Post) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`,
      {
        method: "PUT",
        body: JSON.stringify(updatedPost),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );

    const apiData: Post = await response.json();

    return apiData;
  }
);

const initialState: PostsState = {
  data: [],
  isLoading: false,
  isError: false,
  isLoadingEdit: false,
  isErrorEdit: false,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Post
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
    // Edit Post
    builder.addCase(editPost.pending, (state) => {
      state.isLoadingEdit = true;
      state.isErrorEdit = false;
    });
    builder.addCase(editPost.rejected, (state) => {
      state.isLoadingEdit = false;
      state.isErrorEdit = true;
    });
    builder.addCase(
      editPost.fulfilled,
      (state, action: PayloadAction<Post>) => {
        state.isErrorEdit = false;
        state.isLoadingEdit = false;

        const modifiedPostIndex = state.data.findIndex((item) => {
          return action.payload.id === item.id;
        });

        state.data[modifiedPostIndex] = action.payload;
      }
    );
  },
});

export const actions = postSlice.actions;

export default postSlice.reducer;
