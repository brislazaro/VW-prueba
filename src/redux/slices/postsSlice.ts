import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../components/Types/Types";
import toast from "react-hot-toast";

type PostsState = {
  data: Post[];
  isLoading: boolean;
  isError: boolean;
  isLoadingEdit: boolean;
  isErrorEdit: boolean;
  isLoadingRemove: boolean;
  isErrorRemove: boolean;
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

    toast.success("Post edited successfully");

    return apiData;
  }
);

export const removePost: any = createAsyncThunk(
  "removePost",
  async (id: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "DELETE",
      }
    );

    await response.json();

    toast.success("Post removed successfully");

    return id;
  }
);

const initialState: PostsState = {
  data: [],
  isLoading: false,
  isError: false,
  isLoadingEdit: false,
  isErrorEdit: false,
  isLoadingRemove: false,
  isErrorRemove: false,
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
  },
});

export const actions = postSlice.actions;

export default postSlice.reducer;
