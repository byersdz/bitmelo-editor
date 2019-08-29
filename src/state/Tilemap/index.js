
import { combineReducers } from 'redux';

import activeIndex from './activeIndex';
import tilemaps from './tilemaps';

export const UNDO_TILEMAPS = 'UNDO_TILEMAPS';
export const REDO_TILEMAPS = 'REDO_TILEMAPS';
export const CLEAR_TILEMAPS_HISTORY = 'CLEAR_TILEMAPS_HISTORY';

export default combineReducers( {
  activeIndex,
  tilemaps,
} );

export function undoTilemaps() {
  return {
    type: UNDO_TILEMAPS,
  };
}

export function redoTilemaps() {
  return {
    type: REDO_TILEMAPS,
  };
}
