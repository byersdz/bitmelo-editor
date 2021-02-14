
import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';

// Actions
export const SET_INSTRUCTIONS = 'SET_INSTRUCTIONS';

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
