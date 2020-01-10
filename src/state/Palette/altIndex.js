
import { RESET_PROJECT } from '../globalActions';

// Actions
export const SELECT_ALT_PALETTE_INDEX = 'SELECT_ALT_PALETTE_INDEX';

// Reducer
const initialState = 0;

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case RESET_PROJECT: {
      return initialState;
    }
    case SELECT_ALT_PALETTE_INDEX: {
      return action.payload;
    }
    default:
      return state;
  }
}

// Action Creators
export function selectAltPaletteIndex( paletteIndex ) {
  return {
    type: SELECT_ALT_PALETTE_INDEX,
    payload: paletteIndex,
  };
}
