import {
    SET_USER_AUTH,
    REMOVE_USER_AUTH
} from "../actions/types";

/**
 * Set template state to avoid undefined keys on cold start
 */
const initialState = {
    auth: false,
    token: null
};

/**
 * User reducers for sign in page
 */
function authUserReducer(authUser = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_USER_AUTH:
            return {
                ...authUser,
                auth: payload.auth,
                token: payload.token
            };
        case REMOVE_USER_AUTH:
            return initialState;
        default:
            return authUser;
    }
}

export default authUserReducer;