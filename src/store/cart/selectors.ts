import { createSelector } from "reselect";
import { AppState } from "../interface";
import { initialState } from "./constants";
import { get } from "lodash";

const selectCartStore = (state: AppState) => state.cart || initialState;

export const selectCart = createSelector([selectCartStore], (state) => get(state, "cart", null));