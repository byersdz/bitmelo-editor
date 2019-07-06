
import { RESET_PROJECT } from 'State/globalActions';

// Actions
export const SET_SCRIPT = 'SET_SCRIPT';

// Reducer
const initialState = [
  {
    text: `
engine.onInit = () => {

};

engine.onUpdate = () => {

};
`,
    cursorRow: 0,
    cursorColumn: 0,
  },

];
export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case RESET_PROJECT: {
      return initialState;
    }
    case SET_SCRIPT: {
      const { scriptIndex, script } = action.payload;
      const newState = [...state];
      newState[scriptIndex] = { ...script };
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
