
import { combineReducers } from 'redux';

import colors from './colors';
import selectedIndex from './selectedIndex';

export default combineReducers( {
  colors,
  selectedIndex,
} );
