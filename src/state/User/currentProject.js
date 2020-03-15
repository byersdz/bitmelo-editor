
import { IMPORT_PROJECT_DATA } from '../globalActions';

// Actions
export const SET_CURRENT_USER_PROJECT = 'SET_CURRENT_USER_PROJECT';


// Reducer
const initialState = {
  id: '',
  requiresCreation: false,
};

export function validate( state ) {
  if ( typeof state.id !== 'string' ) {
    return false;
  }

  if ( typeof state.requiresCreation !== 'boolean' ) {
    return false;
  }

  return true;
}

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case IMPORT_PROJECT_DATA: {
      try {
        const importedState = action.payload.user.currentProject;
        if ( validate( importedState ) ) {
          return { ...importedState };
        }
        return state;
      }
      catch ( e ) {
        return state;
      }
    }

    case SET_CURRENT_USER_PROJECT: {
      return { ...action.payload };
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
