import {
    getApiProduct,
    createApiProduct,
    updateApiProduct,
    deleteApiProduct
} from "../../services/productDataService";

import {
    GET_PRODUCT,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT
} from "./types";

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

export const createProduct = (data) => async (dispatch) => {
    try {
        const res = await createApiProduct(data);

        dispatch({
            type: CREATE_PRODUCT,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const updateProduct = (id, data) => async (dispatch) => {
    try {
        const res = await updateApiProduct(id, data);

        dispatch({
            type: UPDATE_PRODUCT,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deleteProduct = (id) => async (dispatch) => {
    try {
        const res = await deleteApiProduct(id);

        dispatch({
            type: DELETE_PRODUCT,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};