
import { Screen } from 'bitmelo';
import { RESET_PROJECT, IMPORT_PROJECT_DATA } from '../globalActions';


// Actions
export const SET_SCREEN_SETTINGS = 'SET_SCREEN_SETTINGS';

// validation
export function validate( state ) {
  if ( typeof state !== 'object' ) {
    return false;
  }

  if ( typeof state.width !== 'number' ) {
    return false;
  }

  if ( typeof state.height !== 'number' ) {
    return false;
  }

  if ( typeof state.scaleMode !== 'number' ) {
    return false;
  }

  if ( typeof state.scale !== 'number' ) {
    return false;
  }

  if ( typeof state.minScale !== 'number' ) {
    return false;
  }

  if ( typeof state.maxScale !== 'number' ) {
    return false;
  }

  if ( typeof state.horizontalScaleCushion !== 'number' ) {
    return false;
  }

  if ( typeof state.verticalScaleCushion !== 'number' ) {
    return false;
  }

  if ( typeof state.rescaleOnWindowResize !== 'boolean' ) {
    return false;
  }

  return true;
}

// Reducer
const initialState = {
  width: 192,
  height: 128,
  scaleMode: Screen.SCALE_CONSTANT,
  scale: 3,
  minScale: 1,
  maxScale: 4,
  horizontalScaleCushion: 10,
  verticalScaleCushion: 10,
  rescaleOnWindowResize: true,
};

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case RESET_PROJECT: {
      return initialState;
    }
    case IMPORT_PROJECT_DATA: {
      try {
        const importedState = action.payload.project.screen;
        if ( validate( importedState ) ) {
          return { ...importedState };
        }
        return state;
      }
      catch ( e ) {
        return state;
      }
    }
    case SET_SCREEN_SETTINGS: {
      return { ...action.payload };
    }
    default:
      return state;
  }
}

// Action Creators
export function setScreenSettings( screen ) {
  return {
    type: SET_SCREEN_SETTINGS,
    payload: screen,
  };
}
