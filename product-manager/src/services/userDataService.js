import api from "./api";

export const getUserAuth = (email, password) => {
    return api.post("/user/token", { email, password });
}