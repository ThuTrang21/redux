import { produce } from "immer";
import { initialState } from "./constants";
import { IAppState } from "./interface";
import * as types from "./types";

export default function appReducer(
  state: IAppState = initialState,
  action: any
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case types.SET_NAVIGATE_FUNCTION:
        draft.navigate = action.payload;
        break;

      case types.GET_PRODUCTS:
        draft.isLoading = true;
        break;

      case types.GET_PRODUCTS_SUCCESS:
        draft.isLoading = false;
        draft.products = action.payload;
        break;

      case types.GET_PRODUCTS_FAIL:
        draft.isLoading = false;
        draft.error = action.payload;
        break;

      case types.GET_PRODUCT:
        draft.isLoading = true;
        break;
      case types.GET_PRODUCT_SUCCESS:
        draft.isLoading = false;
        draft.product = action.payload;
        break;
      case types.GET_PRODUCT_FAIL:
        draft.isLoading = false;
        break;

      case types.CLEAR_PRODUCT:
        draft.product = initialState.product;
        draft.isLoading = false;
        break;
      default:
        return state;
    }
  });
}
