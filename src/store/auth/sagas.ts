import { PayloadAction } from '@reduxjs/toolkit';
import * as types from './types';
import { ILoginRequest } from '../../interfaces/auth';
import { call, put, takeLatest } from 'redux-saga/effects';
import authService from '../../services/auth.service';
import { loginFail, loginSuccess } from './action';
import { putWait } from 'redux-saga-callback';
import path from '../../utils/path';
import { navigate } from '../app/actions';

function* loginSaga({payload}:PayloadAction<ILoginRequest>){
    try {
         yield call(authService.login, payload);
        yield put(loginSuccess());

        yield putWait(navigate(path.HOME));
    } catch (error) {
        yield put(loginFail(error));
    }
}
export default function* authSagas() {
    yield takeLatest(types.LOGIN, loginSaga);
}