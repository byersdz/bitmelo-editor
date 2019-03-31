
import { combineReducers } from 'redux';

import sounds from './sounds';
import activeSound from './activeSound';

export default combineReducers( {
  sounds,
  activeSound,
} );
