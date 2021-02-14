
import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';

import { RESET_PROJECT, IMPORT_PROJECT_DATA } from '../globalActions';

// Actions
export const SET_INSTRUCTIONS = 'SET_INSTRUCTIONS';

// validation
export function validate( state ) {
  if ( typeof state !== 'object' ) {
    return false;
  }

  const checkProperty = ( name, maxLength ) => {
    if ( typeof state[name] !== 'string' ) {
      return false;
    }

    if ( state[name].length > maxLength ) {
      return false;
    }

    return true;
  };

  if ( !checkProperty( 'gameDescription', 140 ) ) {
    return false;
  }

  if ( !checkProperty( 'action1', 32 ) ) {
    return false;
  }

  if ( !checkProperty( 'action1', 32 ) ) {
    return false;
  }

  if ( !checkProperty( 'action2', 32 ) ) {
    return false;
  }

  if ( !checkProperty( 'action3', 32 ) ) {
    return false;
  }

  if ( !checkProperty( 'action4', 32 ) ) {
    return false;
  }

  if ( !checkProperty( 'leftTrigger', 32 ) ) {
    return false;
  }

  if ( !checkProperty( 'rightTrigger', 32 ) ) {
    return false;
  }

  if ( !checkProperty( 'pause', 32 ) ) {
    return false;
  }

  if ( !checkProperty( 'left', 32 ) ) {
    return false;
  }

  if ( !checkProperty( 'right', 32 ) ) {
    return false;
  }

  if ( !checkProperty( 'up', 32 ) ) {
    return false;
  }

  if ( !checkProperty( 'down', 32 ) ) {
    return false;
  }

  return true;
}

// Reducer
const initialState = {
  gameDescription: '',
  action1: '',
  action2: '',
  action3: '',
  action4: '',
  leftTrigger: '',
  rightTrigger: '',
  left: '',
  right: '',
  up: '',
  down: '',
  pause: '',
};

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case RESET_PROJECT: {
      return cloneDeep( initialState );
    }
    case IMPORT_PROJECT_DATA: {
      const importedState = action.payload.project.instructions;
      if ( validate( importedState ) ) {
        return { ...importedState };
      }
      return cloneDeep( initialState );
    }
    case SET_INSTRUCTIONS: {
      const newState = merge( cloneDeep( state ), cloneDeep( action.payload ) );
      return newState;
    }
    default: {
      return state;
    }
  }
}

// Action Creators
export function setInstructions( instructions ) {
  return {
    type: SET_INSTRUCTIONS,
    payload: instructions,
  };
}
