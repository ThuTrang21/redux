import { createSelector } from "reselect";
import { AppState } from "../interface";
import { initialState } from "./constants";
import { get } from "lodash";

const selectAuthStore = (state: AppState) => state.auth || initialState;

export const selectLoadingLogin = createSelector([selectAuthStore], (login) =>
    get(login, 'loadingLogin', false),
  );