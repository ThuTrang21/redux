import { createReduxActions } from '../reduxActions';
import * as types from './types';

export const [addCart, addCartSuccess, addCartFail] = createReduxActions(
    types.ADD_TO_CART,
);

export const [removeCart, removeCartSuccess, removeCartFail] = createReduxActions(
    types.REMOVE_FROM_CART,
);
export const [updateQuantity, updateQuantitySuccess, updateQuantityFail] = createReduxActions(types.UPDATE_QUANTITY);

export const [updateTotalPrice, updateTotalPriceSuccess, updateTotalPriceFail] = createReduxActions(types.UPDATE_TOTAL_PRICE);