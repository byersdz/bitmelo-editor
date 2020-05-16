
import { IMPORT_PROJECT_DATA } from '../globalActions';
import { getGameByProjectId } from '../../api/game';

// Actions
export const SET_CURRENT_USER_PROJECT_ID = 'SET_CURRENT_USER_PROJECT_ID';
export const SET_CURRENT_PROJECT_PUBLISHED_GAME = 'SET_CURRENT_PROJECT_PUBLISHED_GAME';

// Reducer
const initialState = {
  id: '',
  publishedGame: null,
  isFetchingPublishedGame: false,
  fetchPublishedGameErrors: null,
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
          importedState.fetchPublishedGameErrors = null;
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

export function fetchPublishedGame() {
  return async ( dispatch, getState ) => {
    const state = getState();
    const projectId = state.user.currentProject.id;

    const response = await getGameByProjectId( projectId );

    console.log( response );
  };
}
