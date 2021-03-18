import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import blogReducer  from './redux/blogReducer';
import authReducer  from './redux/authReducer';

import App          from './components/App';

const loggerMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  //      console.log('Middleware:', store.getState());
  return result;
};

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const store = createStore( combineReducers({authReducer, blogReducer}), composeEnhancers( applyMiddleware( loggerMiddleware, ReduxThunk)));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);