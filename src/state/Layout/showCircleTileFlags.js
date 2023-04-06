// Actions
export const SET_SHOW_CIRCLE_TILE_FLAGS = 'SET_SHOW_CIRCLE_TILE_FLAGS';

// Reducer
export default function reducer( state = false, action ) {
  switch ( action.type ) {
    case SET_SHOW_CIRCLE_TILE_FLAGS: {
      return action.payload;
    }
    default:
      return state;
  }
}

// Action Creators
export function setShowCircleTileFlags( value ) {
  return {
    type: SET_SHOW_CIRCLE_TILE_FLAGS,
    payload: value,
  };
}
