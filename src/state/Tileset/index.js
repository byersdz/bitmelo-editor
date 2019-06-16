
import { combineReducers } from 'redux';

import tilesets from './tilesets';
import activeIndex from './activeIndex';

export const UNDO_TILESETS = 'UNDO_TILESETS';
export const REDO_TILESETS = 'REDO_TILESETS';

export default combineReducers( {
  tilesets,
  activeIndex,
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
