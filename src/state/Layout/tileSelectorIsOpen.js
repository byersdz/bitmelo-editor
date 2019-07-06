
import { RESET_PROJECT } from 'State/globalActions';

// Actions
export const TOGGLE_TILE_SELECTOR = 'TOGGLE_TILE_SELECTOR';

// Reducer
const initialState = true;

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case RESET_PROJECT: {
      return initialState;
    }
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
