
import { combineReducers } from 'redux';

import sounds from './sounds';
import activeSound from './activeSound';
import audioEvents from './audioEvents';

export default combineReducers( {
  sounds,
  activeSound,
  audioEvents,
} );
