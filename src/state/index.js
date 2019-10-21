
import { combineReducers } from 'redux';
import undoable, { excludeAction } from 'redux-undo';

import { CLEAR_ALL_UNDO_HISTORY } from './globalActions';
import layout from './Layout';
import sound from './Sound';
import palette from './Palette';
import pixelTools from './PixelTools';
import tileset, {
  UNDO_TILESETS,
  REDO_TILESETS,
  CLEAR_TILESETS_HISTORY,
} from './Tileset';
import tilemap, {
  UNDO_TILEMAPS,
  REDO_TILEMAPS,
  CLEAR_TILEMAPS_HISTORY,
} from './Tilemap';
import clipboard from './Clipboard';

import { SET_TILESET_SELECTION } from './Tileset/tilesets';
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
    clearHistoryType: [CLEAR_TILESETS_HISTORY, CLEAR_ALL_UNDO_HISTORY],
    filter: excludeAction( [
      SET_TILESET_SELECTION,
    ] ),
  } ),
  tilemap: undoable( tilemap, {
    limit: 32,
    undoType: UNDO_TILEMAPS,
    redoType: REDO_TILEMAPS,
    clearHistoryType: [CLEAR_TILEMAPS_HISTORY, CLEAR_ALL_UNDO_HISTORY],
  } ),
  project,
  code,
  clipboard,
} );
