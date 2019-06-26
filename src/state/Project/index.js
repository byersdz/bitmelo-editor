
import { combineReducers } from 'redux';

import tileSize from './tileSize';
import name from './name';
import screen from './screen';
import misc from './misc';

export default combineReducers( {
  tileSize,
  name,
  screen,
  misc,
} );
