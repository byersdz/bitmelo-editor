
import { RESET_PROJECT } from 'State/globalActions';

// Actions
export const CHANGE_TILE_SIZE = 'CHANGE_TILE_SIZE';

// Reducer
const initialState = 16;

export default function reducer( state = initialState, action ) { // eslint-disable-line
  switch ( action.type ) {
    case RESET_PROJECT: {
      return initialState;
    }
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
