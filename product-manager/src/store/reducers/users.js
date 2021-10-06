import {
    GET_USER_AUTH
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
function userReducer(authUser = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_USER_AUTH:
            return {
                ...authUser,
                auth: payload.auth,
                token: payload.token
            };
        default:
            return authUser;
    }
}

export default userReducer;