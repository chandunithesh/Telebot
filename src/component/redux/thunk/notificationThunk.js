import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNotification,
  fetchNotifications,
  patchNotification,
} from "../apiCalls";

export let addNotificationData = createAsyncThunk(
  "notification/addNotification",
  async (notification) => {
    let { data } = await addNotification(notification);
    return data;
  }
);

export let fetchNotificationData = createAsyncThunk(
  "notification/fetchNotification",
  async () => {
    let { data } = await fetchNotifications();
    return data;
  }
);

export let patchNotificationData = createAsyncThunk(
  "notification/patchNotification",
  async (dataValue) => {
    let { data } = await patchNotification(dataValue);
    return data;
  }
);
