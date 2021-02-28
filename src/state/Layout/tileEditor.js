
import cloneDeep from 'lodash/cloneDeep';

// Actions
export const SET_TILE_EDITOR_LAYOUT_SETTINGS = 'SET_TILE_EDITOR_LAYOUT_SETTINGS';
export const TOGGLE_TILE_EDITOR_TILE_SELECTOR = 'TOGGLE_TILE_EDITOR_TILE_SELECTOR';
export const TOGGLE_TILE_EDITOR_PANELS = 'TOGGLE_TILE_EDITOR_PANELS';

// Reducer
const initialState = {
  tileSelectorIsOpen: true,
  showGrid: false,
};

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case SET_TILE_EDITOR_LAYOUT_SETTINGS: {
      return { ...action.payload };
    }
    case TOGGLE_TILE_EDITOR_TILE_SELECTOR: {
      const newState = cloneDeep( state );
      newState.tileSelectorIsOpen = !newState.tileSelectorIsOpen;
      return newState;
    }
    case TOGGLE_TILE_EDITOR_PANELS: {
      const newState = cloneDeep( state );
      newState.tileSelectorIsOpen = !newState.tileSelectorIsOpen;
      return newState;
    }
    default: return state;
  }
}

// Action Creators
export function setTileEditorLayoutSettings( settings ) {
  return {
    type: SET_TILE_EDITOR_LAYOUT_SETTINGS,
    payload: settings,
  };
}

export function toggleTileEditorTileSelector() {
  return {
    type: TOGGLE_TILE_EDITOR_TILE_SELECTOR,
  };
}

export function toggleTileEditorPanels() {
  return {
    type: TOGGLE_TILE_EDITOR_PANELS,
  };
}
