import { createActionTypes } from "../reduxActions";

const context = "cart";

export const [ADD_TO_CART, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAIL] =
  createActionTypes(`${context}/ADD_TO_CART`);

export const [
  REMOVE_FROM_CART,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_FAIL,
] = createActionTypes(`${context}/REMOVE_FROM_CART`);

export const [UPDATE_QUANTITY, UPDATE_QUANTITY_SUCCESS, UPDATE_QUANTITY_FAIL] =createActionTypes(`${context}/UPDATE_QUANTITY`);

export const [UPDATE_TOTAL_PRICE, UPDATE_TOTAL_PRICE_SUCCESS, UPDATE_TOTAL_PRICE_FAIL] =createActionTypes(`${context}/UPDATE_TOTAL_PRICE`);