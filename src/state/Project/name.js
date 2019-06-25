
// Actions
export const SET_PROJECT_NAME = 'SET_PROJECT_NAME';

// Reducer
export default function reducer( state = 'My Project', action ) {
  switch ( action.type ) {
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
