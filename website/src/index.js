import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

import 'normalize.css/normalize.css';
import 'styles/reset.scss';

const store = createStore(reducer, { errors: undefined });

// Render the main component into the dom
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
