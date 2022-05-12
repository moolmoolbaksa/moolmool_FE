import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import logger from 'redux-logger';

import userSlice from './modules/user';
import productSlice from './modules/product';
import modalSlice from './modules/modal';
import chatSlice from './modules/chat';
import notiSlice from './modules/notification';


export const history = createBrowserHistory();

const rootReducer = combineReducers({
  user: userSlice,
  product: productSlice,
  modal: modalSlice,
  chat: chatSlice,
  notification: notiSlice,
  router: connectRouter(history),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;