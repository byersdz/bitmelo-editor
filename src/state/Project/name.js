
import { RESET_PROJECT } from 'State/globalActions';

// Actions
export const SET_PROJECT_NAME = 'SET_PROJECT_NAME';

// Reducer
const initialState = 'My Project';
export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case RESET_PROJECT: {
      return initialState;
    }
    case SET_PROJECT_NAME: {
      return action.payload;
    }
    default:
      return state;
  }
}

// Action Creators
export function setProjectName( name ) {
  return {
    type: SET_PROJECT_NAME,
    payload: name,
  };
}
