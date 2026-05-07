import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./../slice/registeSlice";
import loginSlice from "./../slice/loginSlice";
import postSlice from "./../slice/postSlice";
import userSlice from "./../slice/userSlice";
import messageSlice from "./../slice/messageSclice";
import notificationSlice from "./../slice/notificationSlice";

let store = configureStore({
  reducer: {
    register: registerSlice,
    login: loginSlice,
    post: postSlice,
    user: userSlice,
    message: messageSlice,
    notification: notificationSlice,
  },
});

export default store;
