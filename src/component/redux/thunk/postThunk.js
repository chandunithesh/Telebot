import { createAsyncThunk } from "@reduxjs/toolkit";
import { addPost, fetchPost } from "../apiCalls";

export let fetchPostData = createAsyncThunk("post/fetchPost", async () => {
  let { data } = await fetchPost();
  return data;
});

export let addPostData = createAsyncThunk("post/addPost", async (post) => {
  let { data } = await addPost(post);
  return data;
});
