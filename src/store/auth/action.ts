import { createReduxActions } from '../reduxActions';
import * as types from './types';

export const [login, loginSuccess, loginFail] = createReduxActions(types.LOGIN);
