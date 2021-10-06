import api from "./api";

/**
 * Query API and return list of products filtered with given params
 */
export const listApiProducts = (indexList, offsetList, fieldName, directionName) => {
    return api.get("/product", {
        params: {
            index: indexList,
            offset: offsetList,
            field: fieldName,
            direction: directionName,
        }
    });
}

/**
 * Query API and return a product with given id
 */
export const getApiProduct = (id) => {
    return api.get(`/product/${id}`, {});
}

/**
 * Creat a new product on API with given body data
 */
export const createApiProduct = (body) => {
    return api.post(`/product`, body);
}

/**
 * Update product on API with given id and data
 */
export const updateApiProduct = (id, body) => {
    return api.patch(`/product/${id}`, body);
}

/**
 * Remove product on API with given id
 */
export const deleteApiProduct = (id) => {
    return api.delete(`/product/${id}`, {});
}
