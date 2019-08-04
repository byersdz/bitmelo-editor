
// Actions
const SET_STICK_CONSOLE_TO_BOTTOM = 'SET_STICK_CONSOLE_TO_BOTTOM';

// Reducer
const initialState = {
  stickConsoleToBottom: true,
};

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case SET_STICK_CONSOLE_TO_BOTTOM: {
      return { ...state, stickConsoleToBottom: action.payload };
    }
    default: return state;
  }
}

// Action Creators
export function setStickConsoleToBottom( value ) {
  return {
    type: SET_STICK_CONSOLE_TO_BOTTOM,
    payload: value,
  };
}
