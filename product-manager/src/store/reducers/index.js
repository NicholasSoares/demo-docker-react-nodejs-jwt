import { combineReducers } from "redux";
import productReducer from "./products";
import authUserReducer from "./authUser";
import productListReducer from "./productList";

export default combineReducers({
    productReducer,
    productListReducer,
    authUserReducer,
});
