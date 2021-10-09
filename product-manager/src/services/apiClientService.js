import axios from "axios";
import { getToken, logout } from "./authService";

/**
 * Create an new axios instance
 */
const apiClientService = axios.create({
  baseURL: "http://localhost:8000"
});

/**
 * Check if is authenticated and inject auth header in the axios instance
 */
apiClientService.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.common["x-access-token"] = token;
  }
  return config;
});

/**
 * Check if an auth error response was received
 * and execute and page reload to log out the user
 * except if in the sign in page
 */
apiClientService.interceptors.response.use( (response) => {
  return response;
}, function (error) {
  if ([403].includes(error.response?.status) && error.response?.config.url !== '/user/token') {
    logout();
    window.location.reload();
  }
  return Promise.reject(error);
});

export default apiClientService;