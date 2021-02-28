
import merge from 'lodash/merge';

import { RESET_PROJECT, IMPORT_PROJECT_DATA } from '../globalActions';

// Actions
export const SET_MISC_SETTINGS = 'SET_MISC_SETTINGS';

// validation
export function validate( state ) {
  if ( typeof state !== 'object' ) {
    return false;
  }

  if ( typeof state.hideCursor !== 'boolean' ) {
    return false;
  }

  if ( typeof state.clickToBegin !== 'boolean' ) {
    return false;
  }

  if ( typeof state.startTransitionFrames !== 'number' ) {
    return false;
  }

  return true;
}

// Reducer
const initialState = {
  hideCursor: false,
  clickToBegin: true,
  startTransitionFrames: 60,
};

export function mergeState( state, newState ) {
  return merge( initialState, state, newState );
}

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case RESET_PROJECT: {
      return initialState;
    }
    case IMPORT_PROJECT_DATA: {
      try {
        const importedState = { ...action.payload.project.misc };
        if ( validate( importedState ) ) {
          return mergeState( state, importedState );
        }
        return state;
      }
      catch ( e ) {
        return state;
      }
    }
    case SET_MISC_SETTINGS: {
      return { ...action.payload };
    }
    default:
      return state;
  }
}

// Action Creators
export function setMiscSettings( miscSettings ) {
  return {
    type: SET_MISC_SETTINGS,
    payload: miscSettings,
  };
}
