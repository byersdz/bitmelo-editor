
import { combineReducers } from 'redux';

import layout from './Layout';
import sound from './Sound';
import palette from './Palette';
import pixelTools from './PixelTools';

export default combineReducers( {
  layout,
  sound,
  palette,
  pixelTools,
} );
