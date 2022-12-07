import get from 'lodash/get';
import {
  RESET_PROJECT,
  IMPORT_PROJECT_DATA,
} from '../globalActions';

// Actions
export const SET_TILE_FLAGS_ARE_LOCKED = 'SET_TILE_FLAGS_ARE_LOCKED';

// Reducer
export default function reducer( state = false, action ) {
  switch ( action.type ) {
    case RESET_PROJECT: {
      return false;
    }
    case IMPORT_PROJECT_DATA: {
      const importedState = get( action, 'payload.layout.tileFlagsAreLocked', false );
      return importedState;
    }
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
