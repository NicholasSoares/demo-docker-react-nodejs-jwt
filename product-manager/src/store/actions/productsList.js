import {
    listApiProducts
} from "../../services/productDataService";

import {
    LIST_PRODUCTS,
    SORT_PRODUCTS,
} from "./types";

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

export const sortProducts = (indexList, offsetList, fieldName, directionName) => async (dispatch) => {
    try {
        dispatch({
            type: SORT_PRODUCTS,
            payload: {indexList, offsetList, fieldName, directionName},
        });
        return Promise.resolve();
    } catch (err) {
        return Promise.reject(err);
    }
};