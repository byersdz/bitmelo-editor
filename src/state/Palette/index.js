
import { combineReducers } from 'redux';

import colors from './colors';
import selectedIndex from './selectedIndex';
import altIndex from './altIndex';

export default combineReducers( {
  colors,
  selectedIndex,
  altIndex,
} );
