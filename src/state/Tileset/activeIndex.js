
// Actions
export const SELECT_TILESET = 'SELECT_TILESET';

// reducer
export default function reducer( state = 0, action ) {
  switch ( action.type ) {
    case SELECT_TILESET: {
      return action.payload;
    }
    default:
      return state;
  }
}

// action creators
export function selectTileset( tilesetIndex ) {
  return {
    type: SELECT_TILESET,
    payload: tilesetIndex,
  };
}
