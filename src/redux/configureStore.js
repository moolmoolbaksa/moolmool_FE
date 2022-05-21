import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import logger from 'redux-logger';
import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer } from 'redux-persist';

import userSlice from './modules/user';
import productSlice from './modules/product';
import modalSlice from './modules/modal';
import chatSlice from './modules/chat';
import notiSlice from './modules/notification';
import tradehistorySlice from './modules/tradehistory';
import searchSlice from './modules/search';
import itemSlice from './modules/item';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  user: userSlice,
  product: productSlice,
  modal: modalSlice,
  chat: chatSlice,
  tradehistory: tradehistorySlice,
  notification: notiSlice,
  search: searchSlice,
  item: itemSlice,
  router: connectRouter(history),
});

const persistConfig = {
  key: 'root',
  storage: storageSession,
  blacklist: ['router']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const env = process.env.NODE_ENV;

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(logger),
  // middleware: (getDefaultMiddleware) => env === "development" 
  //   ? getDefaultMiddleware({serializableCheck: false}).concat(logger)
  //   : getDefaultMiddleware({serializableCheck: false}),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;