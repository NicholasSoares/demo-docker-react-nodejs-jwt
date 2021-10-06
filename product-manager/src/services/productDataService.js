import api from "./api";

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

export const getApiProduct = (id) => {
    return api.get(`/product/${id}`, {});
}

export const createApiProduct = (body) => {
    return api.post(`/product`, body);
}

export const updateApiProduct = (id, body) => {
    return api.patch(`/product/${id}`, body);
}

export const deleteApiProduct = (id) => {
    return api.delete(`/product/${id}`, {});
}
