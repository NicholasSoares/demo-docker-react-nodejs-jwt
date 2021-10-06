import {
    GET_USER_AUTH
} from "../actions/types";

const initialState = [];

function userReducer(user = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_USER_AUTH:
            return payload;
        default:
            return user;
    }
}

export default userReducer;