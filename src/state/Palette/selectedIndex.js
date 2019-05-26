
// Actions
export const SELECT_PALETTE_INDEX = 'SELECT_PALETTE_INDEX';

// Reducer
export default function reducer( state = 1, action ) {
  switch ( action.type ) {
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
