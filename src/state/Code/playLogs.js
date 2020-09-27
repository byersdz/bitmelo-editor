
import { RESET_PROJECT, IMPORT_PROJECT_DATA } from '../globalActions';

// Actions
export const ADD_PLAY_LOG = 'ADD_PLAY_LOG';
export const CLEAR_PLAY_LOGS = 'CLEAR_PLAY_LOGS';

// reducer
const initialState = [];

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case RESET_PROJECT: {
      return initialState;
    }
    case IMPORT_PROJECT_DATA: {
      return initialState;
    }
    case ADD_PLAY_LOG: {
      return [...state, action.payload];
    }
    case CLEAR_PLAY_LOGS: {
      return [];
    }
    default:
      return state;
  }
}

// action creators
export function addPlayLog( type, text ) {
  console.log( { type, text } );
  return {
    type: ADD_PLAY_LOG,
    payload: {
      type,
      text,
    },
  };
}

export function clearPlayLogs() {
  return {
    type: CLEAR_PLAY_LOGS,
  };
}
