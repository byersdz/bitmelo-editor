
import { combineReducers } from 'redux';

import layout from './Layout';
import sound from './Sound';
import palette from './Palette';

export default combineReducers( {
  layout,
  sound,
  palette,
} );
