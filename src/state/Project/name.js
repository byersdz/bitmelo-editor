
import { RESET_PROJECT, IMPORT_PROJECT_DATA } from '../globalActions';

// Actions
export const SET_PROJECT_NAME = 'SET_PROJECT_NAME';

// validation
export function validate( state ) {
  if ( typeof state !== 'string' ) {
    return false;
  }

  return true;
}

// Reducer
const initialState = 'My Project';
export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case RESET_PROJECT: {
      return initialState;
    }
    case IMPORT_PROJECT_DATA: {
      try {
        const importedState = action.payload.project.name;
        if ( validate( importedState ) ) {
          return importedState;
        }
        return state;
      }
      catch ( e ) {
        return state;
      }
    }

    case SET_PROJECT_NAME: {
      let trimmedName = action.payload.trimStart();
      trimmedName = trimmedName.replace( /[^a-zA-Z0-9 ]/g, '' );
      return trimmedName;
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
