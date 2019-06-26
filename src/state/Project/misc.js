
// Actions
export const SET_MISC_SETTINGS = 'SET_MISC_SETTINGS';

// Reducer
const initialState = {
  hideCursor: false,
  clickToBegin: true,
  startTransitionFrames: 60,
};

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
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
