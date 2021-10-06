import {
    LIST_PRODUCTS,
    SORT_PRODUCTS
} from "../actions/types";

const initialState = {
    productCount: 0,
    products: [],
    index: 0,
    offset: 10,
    field: 'id',
    direction: 'ASC'
};

function productListReducer(productList = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LIST_PRODUCTS:
            return {
                ...productList,
                products: payload.products,
                totalProducts: payload.totalProducts
            };
        case SORT_PRODUCTS:
            return {
                ...productList,
                index: payload.indexList,
                offset: payload.offsetList,
                field: payload.fieldName,
                direction: payload.directionName,
            };
        default:
            return productList;
    }
}

export default productListReducer;