import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import userSlice from './modules/user';

const reducer = {
  user: userSlice,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;