import { createSlice } from "@reduxjs/toolkit";
import {
  addNotificationData,
  fetchNotificationData,
  patchNotificationData,
} from "../thunk/notificationThunk";

let notificationSlice = createSlice({
  name: "notificationSlice",
  initialState: { notification: [] },
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(fetchNotificationData.fulfilled, (state, action) => {
        state.notification = action.payload;
      })
      .addCase(addNotificationData.fulfilled, (state, action) => {
        state.notification.push(action.payload);
      })
      .addCase(patchNotificationData.fulfilled, (state, action) => {
        let index = state.notification.findIndex(
          (value) => value.id === action.payload.id
        );
        console.log(index);
        console.log(action);
      });
  },
});
export default notificationSlice.reducer;
