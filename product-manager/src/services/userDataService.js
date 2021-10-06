import api from "./api";

/**
 * Query API with given email and password and return it's access credentials if valid
 */
export const getUserAuth = (email, password) => {
    return api.post("/user/token", { email, password });
}