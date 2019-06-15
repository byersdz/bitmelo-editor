// Actions
export const TOGGLE_TILE_SELECTOR = 'TOGGLE_TILE_SELECTOR';

// Reducer
export default function reducer( state = true, action ) {
  switch ( action.type ) {
    case TOGGLE_TILE_SELECTOR: {
      return !state;
    }
    default:
      return state;
  }
}

// Action Creators
export function toggleTileSelector() {
  return {
    type: TOGGLE_TILE_SELECTOR,
  };
}
