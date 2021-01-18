
import cloneDeep from 'lodash.clonedeep';
import get from 'lodash.get';
import { RESET_PROJECT, IMPORT_PROJECT_DATA } from '../globalActions';

// Actions
export const SET_SCRIPT = 'SET_SCRIPT';
export const ADD_SCRIPT = 'ADD_SCRIPT';

// validation
export function validate( state ) {
  if ( !Array.isArray( state ) ) {
    return false;
  }

  for ( let i = 0; i < state.length; i += 1 ) {
    if ( typeof state[i] !== 'object' ) {
      return false;
    }

    if ( typeof state[i].text !== 'string' ) {
      return false;
    }
  }

  return true;
}

export function initAndUpdate( state ) {
  const newState = [...state];
  for ( let i = 0; i < state.length; i += 1 ) {
    newState[i].scrollTop = 0;
    newState[i].cursorRow = 0;
    newState[i].cursorColumn = 0;

    const name = get( newState[i], 'name' );
    if ( !name ) {
      newState[i].name = `Script${ i }`;
    }
  }

  return newState;
}

// Reducer
const initialState = [
  {
    text: `
engine.onInit = () => {

};

engine.onUpdate = () => {

};

`,
    name: 'Start',
    cursorRow: 0,
    cursorColumn: 0,
    scrollTop: 0,
  },

];

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case RESET_PROJECT: {
      return initialState;
    }
    case IMPORT_PROJECT_DATA: {
      try {
        const importedState = action.payload.code.scripts;
        if ( validate( importedState ) ) {
          return initAndUpdate( importedState );
        }
        return state;
      }
      catch ( e ) {
        return state;
      }
    }
    case SET_SCRIPT: {
      const { scriptIndex, script } = action.payload;
      const newState = [...state];
      newState[scriptIndex] = { ...script };
      return newState;
    }
    case ADD_SCRIPT: {
      if ( state.length >= 32 ) {
        return state;
      }

      const newState = cloneDeep( state );
      const newScript = cloneDeep( initialState[0] );
      newScript.text = '';
      newScript.name = `Script${ newState.length }`;
      newState.push( newScript );
      return newState;
    }

    default:
      return state;
  }
}


// Action Creators
export function setScript( scriptIndex, script ) {
  return {
    type: SET_SCRIPT,
    payload: {
      scriptIndex,
      script,
    },
  };
}

export function addScript() {
  return {
    type: ADD_SCRIPT,
  };
}
