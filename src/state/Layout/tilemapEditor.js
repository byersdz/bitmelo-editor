
import { RESET_PROJECT } from 'State/globalActions';

// Actions
export const TOGGLE_TILEMAP_SELECTOR = 'TOGGLE_TILEMAP_SELECTOR';
export const TOGGLE_TILEMAP_TILE_SELECTOR = 'TOGGLE_TILEMAP_TILE_SELECTOR';

// Reducer
const initialState = {
  tilemapSelectorIsOpen: true,
  tileSelectorIsOpen: true,
};

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case RESET_PROJECT: {
      return initialState;
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
