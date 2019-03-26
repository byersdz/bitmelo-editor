
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from 'Components/App/App';
import reducers from 'State/index';

import 'normalize.css';

const store = createStore( reducers, applyMiddleware() );

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById( 'root' ),
);
