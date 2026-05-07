import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers, addUser } from "../apiCalls";

// ✅ FETCH USERS
export const fetchUserData = createAsyncThunk(
  "register/fetchUsers",
  async () => {
    const response = await fetchUsers();
    return response.data;
  }
);

// ✅ ADD USER
export const addUserData = createAsyncThunk(
  "register/addUser",
  async (userData) => {
    const response = await addUser(userData);
    return response.data;
  }
);