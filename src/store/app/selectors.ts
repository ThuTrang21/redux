import { createSelector } from "reselect";
import { AppState } from "../interface";
import { initialState } from "./constants";
import { get } from "lodash";


const selectProductStore = (state: AppState) => state.app || initialState;


export const selectNavigate = createSelector([selectProductStore], (app) => get(app, 'navigate'));


export const selectProducts = createSelector([selectProductStore], (state) =>
  get(state, "products", [])
);

export const selectProduct = createSelector([selectProductStore], (state) =>
  get(state, "product", undefined)
);

