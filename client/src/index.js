import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import logger from 'redux-logger';
import rootReducer from './reducers';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { CssBaseline, ThemeProvider } from '@mui/material';
import CustomMuiTheme from './styles/theme';

import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle.js';

const sagaMiddleware = createSagaMiddleware();

//배포 단계에서는 logger 사용하지 않음
const enhancer =
  process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(sagaMiddleware))
    : composeWithDevTools(applyMiddleware(sagaMiddleware, logger));

const store = createStore(rootReducer, enhancer);
// const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
    <ThemeProvider theme={CustomMuiTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
    {/* </PersistGate> */}
  </Provider>,
  document.querySelector('#root')
);
