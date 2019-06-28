
// Actions
export const CHANGE_TILE_SIZE = 'CHANGE_TILE_SIZE';

// Reducer
export default function reducer( state = 16, action ) { // eslint-disable-line
  switch ( action.type ) {
    case CHANGE_TILE_SIZE: {
      return action.payload.newTileSize;
    }
    default:
      return state;
  }
}


// Action Creators
export function changeTileSize( newTileSize ) {
  return {
    type: CHANGE_TILE_SIZE,
    payload: {
      newTileSize,
    },
  };
}
