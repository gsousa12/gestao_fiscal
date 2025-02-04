import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * Tipagem do payload de registro
 */
interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

/**
 * Estado inicial do slice de auth
 */
interface AuthState {
  loading: boolean;
  error: string | null;
  userData: any; // Qualquer dado de resposta do backend
}

const initialState: AuthState = {
  loading: false,
  error: null,
  userData: null,
};

/**
 * createAsyncThunk para registrar usuário
 */
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload: RegisterPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/register",
        payload
      );
      // Se a chamada der certo, retorna o data
      return response.data;
    } catch (error: any) {
      // Se der erro, retorna rejectWithValue para cair no estado de erro
      return rejectWithValue(
        error.response?.data || "Erro ao registrar usuário"
      );
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Se precisar de reducers síncronos, adicione aqui
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userData = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
