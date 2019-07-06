
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import debounce from 'lodash.debounce';

import App from 'Components/App/App';
import reducers from 'State/index';
import storeRegistry from 'State/storeRegistry';

import { loadStateFromLocalStorage, saveStateToLocalStorage } from 'Utils/Saving/localStorage';

import 'normalize.css';

const savedState = loadStateFromLocalStorage();
const store = createStore( reducers, savedState, applyMiddleware() );

const saveDebounced = debounce( saveStateToLocalStorage, 1000 );
store.subscribe( () => {
  saveDebounced( store.getState() );
} );

storeRegistry.register( store );

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById( 'root' ),
);
