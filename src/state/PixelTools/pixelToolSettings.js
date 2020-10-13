
// Actions
const SET_PIXEL_TOOL_SETTINGS = 'SET_PIXEL_TOOL_SETTINGS';

// Reducer
const initialState = {
  pencilSize: 1,
  eraserSize: 1,
  lineSize: 1,
};

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case SET_PIXEL_TOOL_SETTINGS: {
      return { ...action.payload };
    }
    default: return state;
  }
}

// Action Creators
export function setPixelToolSettings( settings ) {
  return {
    type: SET_PIXEL_TOOL_SETTINGS,
    payload: settings,
  };
}
