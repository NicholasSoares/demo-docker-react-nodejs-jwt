import {
    listApiProducts
} from "../../services/productDataService";

import {
    LIST_PRODUCTS,
    SORT_PRODUCTS,
} from "./types";

/**
 * Query products from api with given query sorting params and save to redux storage
 */
export const listProducts = (indexList, offsetList, fieldName, directionName) => async (dispatch) => {
    try {
        const res = await listApiProducts(indexList, offsetList, fieldName, directionName);

        dispatch({
            type: LIST_PRODUCTS,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

/**
 * Set query sorting params on redux storage
 */
export const sortProducts = (indexList, limitList, fieldName, directionName) => async (dispatch) => {
    try {
        dispatch({
            type: SORT_PRODUCTS,
            payload: { indexList, limitList, fieldName, directionName },
        });
        return Promise.resolve();
    } catch (err) {
        return Promise.reject(err);
    }
};