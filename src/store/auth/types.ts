import { createActionTypes } from "../reduxActions"

const context='auth'
export const [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL] = createActionTypes(`${context}/LOGIN`);

