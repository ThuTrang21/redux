import { createActionTypes } from "../reduxActions";


const context = 'app';

export const SET_NAVIGATE_FUNCTION = `${context}/SET_NAVIGATE_FUNCTION`;
export const NAVIGATE = `${context}/NAVIGATE`;

export const [GET_PRODUCTS , GET_PRODUCTS_SUCCESS , GET_PRODUCTS_FAIL ] = createActionTypes(
  `${context}/GET_PRODUCTS`,
);

export const [GET_PRODUCT , GET_PRODUCT_SUCCESS , GET_PRODUCT_FAIL ] = createActionTypes(
  `${context}/GET_PRODUCT`,
);
export const CLEAR_PRODUCT = `${context}/CLEAR_PRODUCT`;