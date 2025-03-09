import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginResponse, LoginCredentials } from "../types/auth";

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: sessionStorage.getItem("access_token") || null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk<LoginResponse, LoginCredentials>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post<LoginResponse>(
        "http://localhost:3000/auth/login",
        credentials
      );
      sessionStorage.setItem("access_token", response.data.data.access_token);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      sessionStorage.removeItem("access_token");
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false;
          state.token = action.payload.data.access_token;
        }
      )
      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || "Falha ao efetuar login";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
