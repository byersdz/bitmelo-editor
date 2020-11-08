
import { RESET_PROJECT } from '../globalActions';
import { TOGGLE_TILE_EDITOR_PANELS } from './tileEditor';

// Actions
export const TOGGLE_TILEMAP_SELECTOR = 'TOGGLE_TILEMAP_SELECTOR';
export const TOGGLE_TILEMAP_TILE_SELECTOR = 'TOGGLE_TILEMAP_TILE_SELECTOR';
export const SET_TILEMAP_CURSOR_POSITION = 'SET_TILEMAP_CURSOR_POSITION';
export const SET_TILEMAP_EDITOR_LAYOUT_SETTINGS = 'SET_TILEMAP_EDITOR_LAYOUT_SETTINGS';
export const TOGGLE_TILEMAP_EDITOR_PANELS = 'TOGGLE_TILEMAP_EDITOR_PANELS';

// Reducer
const initialState = {
  tilemapSelectorIsOpen: true,
  tileSelectorIsOpen: true,
  cursorX: 0,
  cursorY: 0,
  showGrid: true,
};

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case RESET_PROJECT: {
      return initialState;
    }
    case SET_TILEMAP_EDITOR_LAYOUT_SETTINGS: {
      return { ...action.payload };
    }
    case SET_TILEMAP_CURSOR_POSITION: {
      const { x, y } = action.payload;
      const newState = { ...state };
      newState.cursorX = x;
      newState.cursorY = y;
      return newState;
    }
    case TOGGLE_TILEMAP_SELECTOR: {
      const newState = { ...state };
      newState.tilemapSelectorIsOpen = !newState.tilemapSelectorIsOpen;
      return newState;
    }
    case TOGGLE_TILEMAP_TILE_SELECTOR: {
      const newState = { ...state };
      newState.tileSelectorIsOpen = !newState.tileSelectorIsOpen;
      return newState;
    }
    case TOGGLE_TILE_EDITOR_PANELS: {
      const newState = { ...state };
      if ( newState.tilemapSelectorIsOpen || newState.tileSelectorIsOpen ) {
        newState.tilemapSelectorIsOpen = false;
        newState.tileSelectorIsOpen = false;
      }
      else {
        newState.tilemapSelectorIsOpen = true;
        newState.tileSelectorIsOpen = true;
      }
      return newState;
    }
    default:
      return state;
  }
}

// Action Creators
export function toggleTilemapSelector() {
  return {
    type: TOGGLE_TILEMAP_SELECTOR,
  };
}

export function toggleTilemapTileSelector() {
  return {
    type: TOGGLE_TILEMAP_TILE_SELECTOR,
  };
}

export function setTilmapCursorPosition( x, y ) {
  return {
    type: SET_TILEMAP_CURSOR_POSITION,
    payload: {
      x,
      y,
    },
  };
}

export function setTilemapEditorLayoutSettings( settings ) {
  return {
    type: SET_TILEMAP_EDITOR_LAYOUT_SETTINGS,
    payload: settings,
  };
}

export function toggleTilemapEditorPanels() {
  return {
    type: TOGGLE_TILE_EDITOR_PANELS,
  };
}
