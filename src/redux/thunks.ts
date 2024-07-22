import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { CreatePostReq, Post } from "../components/Types/Types";

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

export const createPost: any = createAsyncThunk(
  "createPost",
  async (newPost: CreatePostReq) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const data = await response.json();

    toast.success("Post created successfully");

    return data;
  }
);
