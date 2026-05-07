import { createSlice } from "@reduxjs/toolkit";
import { follow_followers, unFollow_followers } from "../thunk/userThunk";

let userSlice = createSlice({
  name: "userSlice",
  initialState: { userFollowingList: "", isFollowersUpdate: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(follow_followers.fulfilled, (state, action) => {
        state.userFollowingList = action.payload;
        state.isFollowersUpdate = !state.isFollowersUpdate;
      })
      .addCase(unFollow_followers.fulfilled, (state) => {
        state.isFollowersUpdate = !state.isFollowersUpdate;
      });
  },
});

export default userSlice.reducer;
