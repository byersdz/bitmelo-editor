
// Actions
export const SET_SCREEN_SETTINGS = 'SET_SCREEN_SETTINGS';

// Reducer
const initialState = {
  width: 192,
  height: 108,
};

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
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
