import axios from "axios";
import doteenv from "dotenv";

doteenv.config();

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

/*
api.interceptors.request.use(
  (config) => {
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);
*/
