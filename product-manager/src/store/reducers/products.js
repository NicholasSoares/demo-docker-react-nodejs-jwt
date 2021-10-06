import {
    GET_PRODUCT,
} from "../actions/types";

/**
 * Set template state to avoid undefined keys on cold start
 */
const initialState = [];

/**
 * Product reducers for product editing
 */
function productReducer(product = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PRODUCT:
            return payload;
        default:
            return product;
    }
}

export default productReducer;