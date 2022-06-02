import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/configureStore';
import { PersistGate } from 'redux-persist/integration/react'; 
import { persistStore } from 'redux-persist';

export let persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
    </Provider>,
  document.getElementById('root')
);
// reportWebVitals(console.log);