
// Actions
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

// Reducer
const initialState = {
  userName: '',
  displayName: '',
  id: '',
  isLoggedIn: false,
};

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case SET_CURRENT_USER: {
      return { ...action.payload };
    }
    case LOGIN_USER: {
      return { ...state, isLoggedIn: true };
    }
    case LOGOUT_USER: {
      return { ...state, isLoggedIn: false };
    }
    default: return state;
  }
}

// Action Creators
export function setCurrentUser( {
  userName,
  displayName,
  id,
  isLoggedIn,
} ) {
  return {
    type: SET_CURRENT_USER,
    payload: {
      userName,
      displayName,
      id,
      isLoggedIn,
    },
  };
}

export function loginUser() {
  return {
    type: LOGIN_USER,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}
