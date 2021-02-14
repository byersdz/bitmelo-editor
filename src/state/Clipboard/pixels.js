import cloneDeep from 'lodash/cloneDeep';

// Actions
export const SET_CLIPBOARD_PIXELS = 'SET_CLIPBOARD_PIXELS';

// Reducer
const initialState = {
  width: 0,
  height: 0,
  offsetX: 0,
  offsetY: 0,
  data: [],
  isActive: false,
};

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case SET_CLIPBOARD_PIXELS: {
      const clipboardState = action.payload;
      return cloneDeep( clipboardState );
    }
    default: return state;
  }
}

// Action Creators
export function setClipboardPixels( clipboardState ) {
  return {
    type: SET_CLIPBOARD_PIXELS,
    payload: clipboardState,
  };
}
