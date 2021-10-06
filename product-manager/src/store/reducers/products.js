import {
    GET_PRODUCT,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT
} from "../actions/types";

const initialState = [];

function productReducer(products = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case CREATE_PRODUCT:
            return payload;

        case GET_PRODUCT:
            return payload;

        case UPDATE_PRODUCT:
            return payload;

        case DELETE_PRODUCT:
            return payload;

        default:
            return products;
    }
}

export default productReducer;