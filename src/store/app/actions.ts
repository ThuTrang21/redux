import { createReduxAction, createReduxActions } from '../reduxActions';
import * as types from './types';

export const setNavigateFunction = createReduxAction(types.SET_NAVIGATE_FUNCTION);
export const navigate = createReduxAction(types.NAVIGATE);

export const [getProducts, getProductsSuccess, getProductsFail] = createReduxActions(
    types.GET_PRODUCTS,
  );

  export const [getProduct, getProductSuccess, getProductFail] = createReduxActions(
    types.GET_PRODUCT,
  );
  export const clearProduct = createReduxAction(types.CLEAR_PRODUCT);
