// Actions
export const SET_TILE_FLAGS_ARE_LOCKED = 'SET_TILE_FLAGS_ARE_LOCKED';

// Reducer
export default function reducer( state = false, action ) {
  switch ( action.type ) {
    case SET_TILE_FLAGS_ARE_LOCKED: {
      return action.payload;
    }
    default:
      return state;
  }
}

// Action Creators
export function setTileFlagsAreLocked( value ) {
  return {
    type: SET_TILE_FLAGS_ARE_LOCKED,
    payload: value,
  };
}
