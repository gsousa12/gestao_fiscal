import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Tipos inferidos para uso nos hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
