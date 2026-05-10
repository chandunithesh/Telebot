import { createAsyncThunk } from "@reduxjs/toolkit";


const loginValidation = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      // eslint-disable-next-line no-undef
      const response = await fetchUsers();

      const user = response.data.find(
        (u) => u.email === data.email && u.password === data.password
      );

      if (!user) {
        return rejectWithValue("Invalid email or password");
      }

      // ✅ store login
      sessionStorage.setItem("id", user.id);

      return user;
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);

export default loginValidation;