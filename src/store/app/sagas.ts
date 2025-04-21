import { PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../interfaces/app";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { getProductFail, getProductsFail, getProductsSuccess, getProductSuccess } from "./actions";
import { appService } from "../../services/app.service";
import { withCallback } from "redux-saga-callback";
import { NavigateFunction } from "react-router-dom";
import { AnyType } from "../../interfaces/common";
import { selectNavigate } from "./selectors";
import * as types from "./types";


function* navigateSaga({ payload }: AnyType) {
  const navigate: NavigateFunction = yield select(selectNavigate);
  yield navigate(payload);
}

function* getProductSaga({ payload }: PayloadAction<{ id: string }>) {
    const {id} = payload;

    try {
      const response: IProduct= yield call(appService.getProduct, { id });
      yield put(getProductSuccess(response)); 
    } catch (error) {
      console.error("Error in getProductSaga:", error);
      yield put(getProductFail());
    }
  }


  function* getProductsSaga() {
    try {
      const response: IProduct[] = yield call(appService.getProducts);
      yield put(getProductsSuccess(response));
    } catch (error) {
      console.error("Error in getProductSaga:", error);
      yield put(getProductsFail());
    }
  }
  export default function* appSagas() {
    yield takeLatest(types.GET_PRODUCTS, withCallback(getProductsSaga as any));
    yield takeLatest(types.GET_PRODUCT, getProductSaga);
    yield takeLatest(types.NAVIGATE, withCallback(navigateSaga as AnyType));
  }