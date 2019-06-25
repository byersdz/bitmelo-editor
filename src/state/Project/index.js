
import { combineReducers } from 'redux';

import tileSize from './tileSize';
import name from './name';
import screen from './screen';

export default combineReducers( {
  tileSize,
  name,
  screen,
} );
