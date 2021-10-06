import axios from "axios";
import { getToken } from "./auth";

/**
 * Create an new axios instance
 */
const api = axios.create({
  baseURL: "http://localhost:8000"
});

/**
 * Check if is authenticated and inject auth header in the axios instance
 */
api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.common["x-access-token"] = token;
  }
  return config;
});

export default api;