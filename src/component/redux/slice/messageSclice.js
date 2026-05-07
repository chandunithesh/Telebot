import { createSlice } from "@reduxjs/toolkit";
import { addMessageData, fetchMessagesData } from "../messageThunk";

let messageSlice = createSlice({
  name: "messageSlice",
  initialState: { messages: [] },
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(fetchMessagesData.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(addMessageData.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export default messageSlice.reducer;
