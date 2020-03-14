
import { LOGOUT_USER } from './currentUser';

// Actions
export const SET_CURRENT_USER_PROJECT = 'SET_CURRENT_USER_PROJECT';


// Reducer
const initialState = {
  id: '',
  requiresCreation: false,
};

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case SET_CURRENT_USER_PROJECT: {
      return { ...action.payload };
    }
    case LOGOUT_USER: {
      return { ...initialState };
    }
    default: return state;
  }
}

// Action creators
export function setCurrentUserProject( id, requiresCreation = false ) {
  return {
    type: SET_CURRENT_USER_PROJECT,
    payload: {
      id,
      requiresCreation,
    },
  };
}
