
import { combineReducers } from 'redux';

import tileSize from './tileSize';
import name from './name';
import screen from './screen';
import misc from './misc';
import editorVersion from './editorVersion';

export default combineReducers( {
  tileSize,
  name,
  screen,
  misc,
  editorVersion,
} );
