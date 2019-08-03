
import { combineReducers } from 'redux';

import sounds from './sounds';
import activeSound from './activeSound';
import audioEvents from './audioEvents';
import piano from './piano';

export default combineReducers( {
  sounds,
  activeSound,
  audioEvents,
  piano,
} );
