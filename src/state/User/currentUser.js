
import { IMPORT_PROJECT_DATA } from '../globalActions';
import { selectActivePage, PROJECTS_PAGE } from '../Layout/activePage';

// Actions
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

// Reducer
const initialState = {
  userName: '',
  displayName: '',
  id: '',
  email: '',
  dateCreated: '',
  isLoggedIn: false,
};

export function validate( state ) {
  if ( typeof state.userName !== 'string' ) {
    return false;
  }

  if ( typeof state.displayName !== 'string' ) {
    return false;
  }

  if ( typeof state.id !== 'string' ) {
    return false;
  }

  if ( typeof state.email !== 'string' ) {
    return false;
  }

  if ( typeof state.dateCreated !== 'string' ) {
    return false;
  }

  if ( typeof state.isLoggedIn !== 'boolean' ) {
    return false;
  }

  return true;
}

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case IMPORT_PROJECT_DATA: {
      try {
        const importedState = action.payload.user.currentUser;
        if ( validate( importedState ) ) {
          return { ...importedState };
        }
        return state;
      }
      catch ( e ) {
        return state;
      }
    }
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
  email,
  dateCreated,
  isLoggedIn,
} ) {
  return {
    type: SET_CURRENT_USER,
    payload: {
      userName,
      displayName,
      id,
      email,
      dateCreated,
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
  return async dispatch => {
    dispatch( { type: LOGOUT_USER } );
    dispatch( selectActivePage( PROJECTS_PAGE ) );
  };
}
