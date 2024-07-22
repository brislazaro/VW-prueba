import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../components/Types/Types";
import { createPost, editPost, fetchPosts, removePost } from "../thunks";

type PostsState = {
  data: Post[];
  isLoading: boolean;
  isError: boolean;
  isLoadingEdit: boolean;
  isErrorEdit: boolean;
  isLoadingRemove: boolean;
  isErrorRemove: boolean;
  isLoadingCreate: boolean;
  isErrorCreate: boolean;
  createdPosts: number;
};

const initialState: PostsState = {
  data: [],
  isLoading: false,
  isError: false,
  isLoadingEdit: false,
  isErrorEdit: false,
  isLoadingRemove: false,
  isErrorRemove: false,
  isLoadingCreate: false,
  isErrorCreate: false,
  createdPosts: 0,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetCreatedPosts: (state) => {
      state.createdPosts = 0;
    },
  },
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

    // Remove Post
    builder.addCase(removePost.pending, (state) => {
      state.isLoadingRemove = true;
      state.isErrorRemove = false;
    });
    builder.addCase(removePost.rejected, (state) => {
      state.isLoadingRemove = false;
      state.isErrorRemove = true;
    });
    builder.addCase(
      removePost.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.isErrorRemove = false;
        state.isLoadingRemove = false;

        state.data = state.data.filter((post) => {
          return post.id !== action.payload;
        });
      }
    );

    // Create post
    builder.addCase(createPost.pending, (state) => {
      state.isLoadingCreate = true;
      state.isErrorCreate = false;
    });
    builder.addCase(createPost.rejected, (state) => {
      state.isLoadingCreate = false;
      state.isErrorCreate = true;
    });
    builder.addCase(
      createPost.fulfilled,
      (state, action: PayloadAction<Post>) => {
        state.isErrorCreate = false;
        state.isLoadingCreate = false;

        const lastId = state.data.sort((a, b) => a.id - b.id)[
          state.data.length - 1
        ].id;

        const newPost: Post = {
          ...action.payload,
          id: lastId + 1,
        };

        state.data.push(newPost);
        state.createdPosts += 1;
      }
    );
  },
});

export const { resetCreatedPosts } = postSlice.actions;

export default postSlice.reducer;
