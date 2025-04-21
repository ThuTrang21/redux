import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './app/reducer';
import cartReducer from './cart/reducers';
import authReducer from './auth/reducer';

const rootReducer = combineReducers({
  app: appReducer,
  cart: cartReducer,
  auth: authReducer,
});

export default rootReducer;
