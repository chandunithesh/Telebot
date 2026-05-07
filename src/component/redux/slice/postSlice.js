import { createSlice } from "@reduxjs/toolkit";
import { addPostData, fetchPostData } from "../thunk/postThunk";

let postSlice = createSlice({
  name: "postSlice",
  initialState: { posts: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostData.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(addPostData.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      });
  },
});
export default postSlice.reducer;
