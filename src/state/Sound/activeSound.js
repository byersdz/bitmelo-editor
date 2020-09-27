
import { RESET_PROJECT, IMPORT_PROJECT_DATA } from '../globalActions';

// Actions
export const SELECT_SOUND = 'SELECT_SOUND';

// reducer
export default function reducer( state = 0, action ) {
  switch ( action.type ) {
    case RESET_PROJECT: {
      return 0;
    }
    case IMPORT_PROJECT_DATA: {
      return 0;
    }
    case SELECT_SOUND: {
      return action.payload;
    }
    default:
      return state;
  }
}

// action creators
export function selectSound( soundIndex ) {
  return {
    type: SELECT_SOUND,
    payload: soundIndex,
  };
}
