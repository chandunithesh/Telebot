import { createAsyncThunk } from "@reduxjs/toolkit";
import { addMessage, fetchMessages } from "./apiCalls";

export let addMessageData = createAsyncThunk(
  "messages/addMessages",
  async (message) => {
    let { data } = await addMessage(message);
    return data;
  }
);

export let fetchMessagesData = createAsyncThunk(
  "messages/fetchMessages",
  async () => {
    let { data } = await fetchMessages();
    return data;
  }
);