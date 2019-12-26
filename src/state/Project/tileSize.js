
import { RESET_PROJECT, IMPORT_PROJECT_DATA } from '../globalActions';

// Actions
export const CHANGE_TILE_SIZE = 'CHANGE_TILE_SIZE';

// validation
export function validate( state ) {
  if ( typeof state !== 'number' ) {
    return false;
  }

  return true;
}

// Reducer
const initialState = 16;

export default function reducer( state = initialState, action ) { // eslint-disable-line
  switch ( action.type ) {
    case RESET_PROJECT: {
      return initialState;
    }
    case IMPORT_PROJECT_DATA: {
      try {
        const importedState = action.payload.project.tileSize;
        if ( validate( importedState ) ) {
          return importedState;
        }
        return state;
      }
      catch ( e ) {
        return state;
      }
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
