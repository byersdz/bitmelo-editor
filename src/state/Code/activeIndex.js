
// Actions
export const SELECT_SCRIPT = 'SELECT_SCRIPT';

// reducer
export default function reducer( state = 0, action ) {
  switch ( action.type ) {
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
