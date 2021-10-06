import { combineReducers } from "redux";
import productReducer from "./products";
import userReducer from "./users";
import productListReducer from "./productList";

export default combineReducers({
    productReducer,
    productListReducer,
    userReducer,
});
