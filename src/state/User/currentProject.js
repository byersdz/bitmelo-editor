
import { IMPORT_PROJECT_DATA } from '../globalActions';
import { getGameByProjectId } from '../../api/game';

import { logoutUser } from './currentUser';

// Actions
export const SET_CURRENT_USER_PROJECT_ID = 'SET_CURRENT_USER_PROJECT_ID';
export const SET_CURRENT_PROJECT_PUBLISHED_GAME = 'SET_CURRENT_PROJECT_PUBLISHED_GAME';
export const SET_IS_FETCHING_PUBLISHED_GAME = 'SET_IS_FETCHING_PUBLISHED_GAME';
export const SET_FETCHING_PUBLISHED_GAME_ERRORS = 'SET_FETCHING_PUBLISHED_GAME_ERRORS';


// Reducer
const initialState = {
  id: '',
  publishedGame: null,
  isFetchingPublishedGame: false,
  fetchPublishedGameErrors: [],
};

export function validate( state ) {
  if ( typeof state.id !== 'string' ) {
    return false;
  }

  return true;
}

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case IMPORT_PROJECT_DATA: {
      try {
        const importedState = { ...action.payload.user.currentProject };
        if ( validate( importedState ) ) {
          importedState.publishedGame = null;
          importedState.isFetchingPublishedGame = false;
          importedState.fetchPublishedGameErrors = [];
          return importedState;
        }
        return state;
      }
      catch ( e ) {
        return state;
      }
    }

    case SET_CURRENT_USER_PROJECT_ID: {
      const newState = { ...state };
      newState.id = action.payload;
      return newState;
    }

    case SET_IS_FETCHING_PUBLISHED_GAME: {
      const newState = { ...state };
      newState.isFetchingPublishedGame = action.payload;
      return newState;
    }

    case SET_FETCHING_PUBLISHED_GAME_ERRORS: {
      const newState = { ...state };
      newState.fetchPublishedGameErrors = action.payload;
      return newState;
    }

    case SET_CURRENT_PROJECT_PUBLISHED_GAME: {
      const newState = { ...state };
      if ( action.payload ) {
        newState.publishedGame = { ...action.payload };
      }
      else {
        newState.publishedGame = null;
      }
      return newState;
    }

    default: return state;
  }
}

// Action creators
export function setCurrentUserProjectId( id ) {
  return {
    type: SET_CURRENT_USER_PROJECT_ID,
    payload: id,
  };
}

export function setCurrentProjectPublishedGame( publishedGame ) {
  return {
    type: SET_CURRENT_PROJECT_PUBLISHED_GAME,
    payload: publishedGame,
  };
}

export function setIsFetchingPublishedGame( isFetching ) {
  return {
    type: SET_IS_FETCHING_PUBLISHED_GAME,
    payload: isFetching,
  };
}

export function setFetchingPublishedGameErrors( errors ) {
  return {
    type: SET_FETCHING_PUBLISHED_GAME_ERRORS,
    payload: errors,
  };
}

export function fetchPublishedGame() {
  return async ( dispatch, getState ) => {
    const state = getState();
    const projectId = state.user.currentProject.id;

    dispatch( setIsFetchingPublishedGame( true ) );
    dispatch( setFetchingPublishedGameErrors( [] ) );

    const response = await getGameByProjectId( projectId );

    if ( response.status === 401 ) {
      dispatch( logoutUser() );
    }

    if ( response.isError ) {
      dispatch( setFetchingPublishedGameErrors( response.errors ) );
    }
    else {
      dispatch( setCurrentProjectPublishedGame( response.data ) );
    }

    dispatch( setIsFetchingPublishedGame( false ) );
  };
}
