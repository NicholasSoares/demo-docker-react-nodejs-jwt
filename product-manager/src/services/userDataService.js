import apiClientService from "./apiClientService";

/**
 * Query API with given email and password and return it's access credentials if valid
 */
export const getUserAuth = (email, password) => {
    return apiClientService.post("/user/token", { email, password });
}

/**
 * Query API with given email and password and return it's access credentials if valid
 */
export const removeUserAuth = () => {
    return apiClientService.delete("/user/token");
}