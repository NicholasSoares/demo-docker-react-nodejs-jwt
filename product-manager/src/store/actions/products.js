import {
    getApiProduct,
    createApiProduct,
    updateApiProduct,
    deleteApiProduct
} from "../../services/productDataService";

import {
    GET_PRODUCT,
} from "./types";

/**
 * Get a product from API with given id and save to redux storage
 */
export const getProduct = (id) => async (dispatch) => {
    try {
        const res = await getApiProduct(id);

        dispatch({
            type: GET_PRODUCT,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

/**
 * Create an new product on API
 */
export const createProduct = (data) => async () => {
    try {
        const res = await createApiProduct(data);
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

/**
 * Update an product on API with given id and data
 */
export const updateProduct = (id, data) => async () => {
    try {
        const res = await updateApiProduct(id, data);
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

/**
 * Delete an product on API with given id
 */
export const deleteProduct = (id) => async () => {
    try {
        const res = await deleteApiProduct(id);
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};