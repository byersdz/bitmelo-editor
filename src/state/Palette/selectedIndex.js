
import { RESET_PROJECT, IMPORT_PROJECT_DATA } from '../globalActions';

// Actions
export const SELECT_PALETTE_INDEX = 'SELECT_PALETTE_INDEX';

// Reducer
const initialState = 1;

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case RESET_PROJECT: {
      return initialState;
    }
    case IMPORT_PROJECT_DATA: {
      return initialState;
    }
    case SELECT_PALETTE_INDEX: {
      return action.payload;
    }
    default:
      return state;
  }
}

// Action Creators
export function selectPaletteIndex( paletteIndex ) {
  return {
    type: SELECT_PALETTE_INDEX,
    payload: paletteIndex,
  };
}
