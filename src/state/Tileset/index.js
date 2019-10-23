
import { combineReducers } from 'redux';

import tilesets from './tilesets';
import activeIndex from './activeIndex';
import editorSelection from './editorSelection';

export const UNDO_TILESETS = 'UNDO_TILESETS';
export const REDO_TILESETS = 'REDO_TILESETS';
export const CLEAR_TILESETS_HISTORY = 'CLEAR_TILESETS_HISTORY';

export default combineReducers( {
  tilesets,
  activeIndex,
  editorSelection,
} );

export function undoTilesets() {
  return {
    type: UNDO_TILESETS,
  };
}

export function redoTilesets() {
  return {
    type: REDO_TILESETS,
  };
}

export function clearTilesetsHistory() {
  return {
    type: CLEAR_TILESETS_HISTORY,
  };
}
