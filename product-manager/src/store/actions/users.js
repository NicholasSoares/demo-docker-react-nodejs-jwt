import {
    SET_USER_AUTH,
    REMOVE_USER_AUTH
} from "./types";

import { logout } from "../../services/authService";
import { getUserAuth, removeUserAuth } from "../../services/userDataService";

/**
 * Try to authorize user on API and save return to redux storage
 */
export const getApiUserAuthorization = (email, password) => async (dispatch) => {
    try {
        const res = await getUserAuth(email, password);

        dispatch({
            type: SET_USER_AUTH,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

/**
 * Remove user authorization on API, logout and reset authUser redux storage
 */
export const removeApiUserAuthorization = () => async (dispatch) => {
    try {
        const res = await removeUserAuth();

        dispatch({
            type: REMOVE_USER_AUTH,
            payload: res.data,
        });

        logout();

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};