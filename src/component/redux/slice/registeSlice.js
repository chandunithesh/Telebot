import { createSlice } from "@reduxjs/toolkit";
import { addUserData, fetchUserData } from "../thunk/registerThunk";

let registerSlice = createSlice({
  name: "registerSlice",
  initialState: {
    userData: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(addUserData.fulfilled, (state, action) => {
        state.userData.push(action.payload);
      });
  },
});

export default registerSlice.reducer;
