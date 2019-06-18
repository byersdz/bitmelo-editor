
import { combineReducers } from 'redux';
import undoable from 'redux-undo';

import layout from './Layout';
import sound from './Sound';
import palette from './Palette';
import pixelTools from './PixelTools';
import tileset, { UNDO_TILESETS, REDO_TILESETS } from './Tileset';
import project from './Project';
import code from './Code';

export default combineReducers( {
  layout,
  sound,
  palette,
  pixelTools,
  tileset: undoable( tileset, {
    limit: 32,
    undoType: UNDO_TILESETS,
    redoType: REDO_TILESETS,
  } ),
  project,
  code,
} );
