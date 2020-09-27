
import { IMPORT_PROJECT_DATA } from '../globalActions';
import { selectActivePage, PROJECTS_PAGE } from '../Layout/activePage';
import {
  deleteUser as deleteUserApi,
  logoutUser as logoutUserApi,
  checkIfLoggedIn,
  changePassword,
} from '../../api/user';
import cloneDeep from 'lodash.clonedeep';

// Actions
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_USER_IS_DELETING = 'SET_USER_IS_DELETING';
export const SET_USER_DELETING_ERRORS = 'SET_USER_DELETING_ERRORS';
export const SET_USER_IS_CHANGING_PASSWORD = 'SET_USER_IS_CHANGING_PASSWORD';
export const SET_USER_CHANGING_PASSWORD_ERRORS = 'SET_USER_CHANGING_PASSWORD_ERRORS';

// Reducer
const initialState = {
  userName: '',
  displayName: '',
  id: '',
  email: '',
  dateCreated: '',
  isLoggedIn: false,
  isDeleting: false,
  deletingErrors: [],
  isChangingPassword: false,
  changingPasswordErrors: [],
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
          return {
            ...importedState,
            deletingErrors: [],
            isDeleting: false,
            isChangingPassword: false,
            changingPasswordErrors: [],
          };
        }
        return state;
      }
      catch ( e ) {
        return state;
      }
    }
    case SET_USER_IS_DELETING: {
      const newState = { ...state };
      newState.isDeleting = action.payload;
      return newState;
    }
    case SET_USER_DELETING_ERRORS: {
      const newState = { ...state };
      newState.deletingErrors = [...action.payload];
      return newState;
    }
    case SET_USER_IS_CHANGING_PASSWORD: {
      const newState = { ...state };
      newState.isChangingPassword = action.payload;
      return newState;
    }
    case SET_USER_CHANGING_PASSWORD_ERRORS: {
      const newState = { ...state };
      newState.changingPasswordErrors = [...action.payload];
      return newState;
    }
    case SET_CURRENT_USER: {
      return { ...action.payload };
    }
    case LOGIN_USER: {
      return { ...state, isLoggedIn: true };
    }
    case LOGOUT_USER: {
      return cloneDeep( initialState );
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

export function setIsDeleting( isDeleting ) {
  return {
    type: SET_USER_IS_DELETING,
    payload: isDeleting,
  };
}

export function setDeletingErrors( errors ) {
  return {
    type: SET_USER_DELETING_ERRORS,
    payload: errors,
  };
}

export function setIsChangingPassword( isChangingPassword ) {
  return {
    type: SET_USER_IS_CHANGING_PASSWORD,
    payload: isChangingPassword,
  };
}

export function setChangingPasswordErrors( errors ) {
  return {
    type: SET_USER_CHANGING_PASSWORD_ERRORS,
    payload: errors,
  };
}

// Async Actions

export function logoutUser() {
  return async dispatch => {
    dispatch( { type: LOGOUT_USER } );
    dispatch( selectActivePage( PROJECTS_PAGE ) );

    await logoutUserApi();
  };
}

export function checkLoginStatus() {
  return async dispatch => {
    const response = await checkIfLoggedIn();
    if ( response.isError && !IS_DESKTOP ) {
      dispatch( logoutUser() );
    }
  };
}

export function deleteUser( password ) {
  return async ( dispatch, getState ) => {
    dispatch( setIsDeleting( true ) );
    dispatch( setDeletingErrors( [] ) );
    const state = getState();
    const userId = state.user.currentUser.id;
    const response = await deleteUserApi( userId, password );


    if ( response.status === 401 ) {
      dispatch( logoutUser() );
    }

    if ( response.isError ) {
      dispatch( setDeletingErrors( response.errors ) );
    }
    else {
      // successfull account deletion, logout with a delay
      setTimeout( () => {
        dispatch( logoutUser() );
      }, 2000 );
    }

    dispatch( setIsDeleting( false ) );
  };
}

export function changeUserPassword( oldPassword, newPassword, newPassword2 ) {
  return async ( dispatch, getState ) => {
    dispatch( setIsChangingPassword( true ) );
    dispatch( setChangingPasswordErrors( [] ) );
    const state = getState();
    const userId = state.user.currentUser.id;

    const response = await changePassword( userId, oldPassword, newPassword, newPassword2 );

    if ( response.status === 401 ) {
      dispatch( logoutUser() );
    }

    if ( response.isError ) {
      dispatch( setChangingPasswordErrors( response.errors ) );
    }

    dispatch( setIsChangingPassword( false ) );
  };
}
