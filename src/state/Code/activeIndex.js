
import { RESET_PROJECT } from 'State/globalActions';

// Actions
export const SELECT_SCRIPT = 'SELECT_SCRIPT';

// reducer
const initialState = 0;

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case RESET_PROJECT: {
      return initialState;
    }
    case SELECT_SCRIPT: {
      return action.payload;
    }
    default:
      return state;
  }
}

// action creators
export function selectScript( scriptIndex ) {
  return {
    type: SELECT_SCRIPT,
    payload: scriptIndex,
  };
}
