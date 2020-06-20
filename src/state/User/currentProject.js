
import { IMPORT_PROJECT_DATA } from '../globalActions';
import { getGameByProjectId, publishGame } from '../../api/game';
import createTransferProject from '../../utils/Convert/createTransferProject';
import cloneDeep from 'lodash.clonedeep';

import { logoutUser, LOGOUT_USER } from './currentUser';

// Actions
export const SET_CURRENT_USER_PROJECT_ID = 'SET_CURRENT_USER_PROJECT_ID';
export const SET_CURRENT_PROJECT_PUBLISHED_GAME = 'SET_CURRENT_PROJECT_PUBLISHED_GAME';
export const SET_IS_FETCHING_PUBLISHED_GAME = 'SET_IS_FETCHING_PUBLISHED_GAME';
export const SET_IS_PUBLISHING = 'SET_IS_PUBLISHING';
export const SET_FETCHING_PUBLISHED_GAME_ERRORS = 'SET_FETCHING_PUBLISHED_GAME_ERRORS';
export const SET_PUBLISHING_ERRORS = 'SET_PUBLISHING_ERRORS';


// Reducer
const initialState = {
  id: '',
  publishedGame: null,
  isFetchingPublishedGame: false,
  isPublishing: false,
  fetchPublishedGameErrors: [],
  publishingErrors: [],
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

    case SET_IS_PUBLISHING: {
      const newState = { ...state };
      newState.isPublishing = action.payload;
      return newState;
    }

    case SET_FETCHING_PUBLISHED_GAME_ERRORS: {
      const newState = { ...state };
      newState.fetchPublishedGameErrors = action.payload;
      return newState;
    }

    case SET_PUBLISHING_ERRORS: {
      const newState = { ...state };
      newState.publishingErrors = action.payload;
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

    case LOGOUT_USER: {
      return cloneDeep( initialState );
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

export function setIsPublishing( isPublishing ) {
  return {
    type: SET_IS_PUBLISHING,
    payload: isPublishing,
  };
}

export function setFetchingPublishedGameErrors( errors ) {
  return {
    type: SET_FETCHING_PUBLISHED_GAME_ERRORS,
    payload: errors,
  };
}

export function setPublishingErrors( errors ) {
  return {
    type: SET_PUBLISHING_ERRORS,
    payload: errors,
  };
}

export function fetchPublishedGame() {
  return async ( dispatch, getState ) => {
    const state = getState();
    const projectId = state.user.currentProject.id;

    dispatch( setIsFetchingPublishedGame( true ) );
    dispatch( setFetchingPublishedGameErrors( [] ) );
    dispatch( setCurrentProjectPublishedGame( null ) );

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

export function publishCurrentProject() {
  return async ( dispatch, getState ) => {
    dispatch( setIsPublishing( true ) );
    dispatch( setPublishingErrors( [] ) );

    const state = getState();
    const projectId = state.user.currentProject.id;
    const projectData = createTransferProject( state );

    const response = await publishGame( projectId, projectData );

    if ( response.status === 401 ) {
      dispatch( logoutUser() );
    }

    if ( response.isError ) {
      dispatch( setPublishingErrors( response.errors ) );
    }
    else {
      dispatch( setCurrentProjectPublishedGame( response.data ) );
    }

    dispatch( setIsPublishing( false ) );
  };
}
