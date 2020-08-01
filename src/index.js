import React from 'react';
import ReactDom from 'react-dom';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import App from './App';
import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const devMode = process.env.NODE_ENV === 'development';
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

devMode && middleware.push(logger);

const store = configureStore({
  reducer: rootReducer,
  devtools: devMode,
  middleware
});

sagaMiddleware.run(rootSaga);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));

