import apiClientService from "./apiClientService";

/**
 * Query API and return list of products filtered with given params
 */
export const listApiProducts = (indexList, limitList, fieldName, directionName) => {
    return apiClientService.get("/product", {
        params: {
            index: indexList,
            limit: limitList,
            field: fieldName,
            direction: directionName,
        }
    });
}

/**
 * Query API and return a product with given id
 */
export const getApiProduct = (id) => {
    return apiClientService.get(`/product/${id}`, {});
}

/**
 * Creat a new product on API with given body data
 */
export const createApiProduct = (body) => {
    return apiClientService.post(`/product`, body);
}

/**
 * Update product on API with given id and data
 */
export const updateApiProduct = (id, body) => {
    return apiClientService.patch(`/product/${id}`, body);
}

/**
 * Remove product on API with given id
 */
export const deleteApiProduct = (id) => {
    return apiClientService.delete(`/product/${id}`, {});
}
