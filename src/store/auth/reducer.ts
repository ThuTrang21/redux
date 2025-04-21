import { produce } from "immer";
import { IAction } from "../interface";
import { initialState } from "./constants";
import { IAuthState } from "./interface";
import * as types from "./types";

export default function authReducer(state: IAuthState = initialState, action: IAction) {
    return produce(state, (draft) => {
        switch (action.type) {

            case types.LOGIN:
                draft.loadingLogin = true;
                draft.errorLogin = {};
                break;
            case types.LOGIN_SUCCESS:
                draft.loadingLogin = false;
                draft.errorLogin = {};
                break;
            case types.LOGIN_FAIL:
                draft.loadingLogin = false;
                draft.errorLogin = action.payload;
                break;
            default:
                break;
        }
    })
}