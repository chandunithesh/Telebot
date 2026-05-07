import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers } from "../apiCalls";

export const fetchUserData = createAsyncThunk(
  "register/fetchUsers",
  async () => {
    const { data } = await fetchUsers();
    return data;
  }
);