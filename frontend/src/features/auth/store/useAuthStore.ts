import { create } from "zustand";
import { api } from "@/axios/axiosInstance";

interface User {
  _id?: string;
  username?: string;
  email?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  success: string | null;
  registerUser: (payload: RegisterPayload) => Promise<void>;
}

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
  success: null,

  registerUser: async (payload) => {
    try {
      set({ loading: true, error: null, success: null });

      const response = await api.post("/auth/register", payload);
      const successMessage = response.data.message;

      set({
        user: null,
        loading: false,
        error: null,
        success: successMessage,
      });
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error.message;
      set({ loading: false, error: errorMessage, success: null });
    }
  },
}));
