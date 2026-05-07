import { createAsyncThunk } from "@reduxjs/toolkit";
import { addUser, fetchUSers } from "../apicalls";

export let addUserData = createAsyncThunk("auth/addUser", async (user) => {
  let { data } = await addUser(user);
  return data;
});

export let fetchUserData = createAsyncThunk("auth/fetchUsers", async () => {
  let { data } = await fetchUSers();
  return data;
});
