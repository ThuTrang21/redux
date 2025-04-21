import { all, call } from "redux-saga/effects";
import appSagas from "./app/sagas";
import authSagas from "./auth/sagas";


export default function* rootSaga() {
  yield all([
    call(appSagas),
    call(authSagas),
  ]);
}
