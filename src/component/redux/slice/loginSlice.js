import { createSlice } from "@reduxjs/toolkit";
import loginValidation from "../thunk/loginThunc";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    userId: null,
    isLogin: false,
    error: null,
  },

  reducers: {
    logOut: (state) => {
      state.userId = null;
      state.isLogin = false;
      sessionStorage.removeItem("id"); // ✅ clear storage
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginValidation.fulfilled, (state, action) => {
        state.userId = action.payload;
        state.isLogin = true;
        state.error = null;
      })
      .addCase(loginValidation.rejected, (state, action) => {
        state.error = action.payload;
        state.isLogin = false;
      });
  },
});

export const { logOut } = loginSlice.actions;
export default loginSlice.reducer;