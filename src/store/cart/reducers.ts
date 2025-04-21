import { produce } from "immer";
import { initialState } from "./constants";
import { ICartState } from "./interface";
import * as types from "./types";

export default function cartReducer(
    state: ICartState = initialState,
    action: any
) {

    return produce(state, (draft) => {
        switch (action.type) {
            case types.ADD_TO_CART:
                draft.isLoading = true;
                if (!draft.cart) {
                    draft.cart = { products: [action.payload] };
                } else {
                    const existingProduct = draft.cart.products.find(
                        (item) => item.product.id === action.payload.product.id
                    );

                    if (existingProduct) {
                        existingProduct.quantity = action.payload.quantity;
                    } else {
                        draft.cart.products.push(action.payload);
                    }
                }
                break;
            case types.ADD_TO_CART_SUCCESS:
                draft.isLoading = false;
                draft.cart = action.payload;
                break;
            case types.ADD_TO_CART_FAIL:
                draft.isLoading = false;
                draft.error = action.payload;
                break;


            case types.UPDATE_QUANTITY:
                if (!draft.cart) {
                    return;
                }

                const existingProduct = draft.cart.products.find(
                    (item) => item.product.id === action.payload.productId
                );

                if (existingProduct) {
                    existingProduct.quantity = action.payload.quantity;
                }
                break;
            case types.UPDATE_QUANTITY_SUCCESS:
                draft.isLoading = false;
                draft.cart = action.payload;
                break;
            case types.UPDATE_QUANTITY_FAIL:
                draft.isLoading = false;
                draft.error = action.payload;
                break;


            case types.REMOVE_FROM_CART:
                draft.isLoading = true;
                if (draft.cart) {
                    draft.cart.products = draft.cart.products.filter(
                        (item) => item.product.id !== action.payload
                    );
                }
                break;
            case types.REMOVE_FROM_CART_SUCCESS:
                draft.isLoading = false;
                draft.cart = action.payload;
                break;
            case types.REMOVE_FROM_CART_FAIL:
                draft.isLoading = false;
                draft.error = action.payload;
                break;


            case types.UPDATE_TOTAL_PRICE:
                if (draft.cart) {
                    draft.cart.totalPrice = draft.cart.products.reduce(
                        (sum, item) => sum + item.product.price * item.quantity, 0
                    );
                }
                break;
            default:
                return state;
        }
    });
}