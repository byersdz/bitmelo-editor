// Actions
export const SET_COLOR_PICKER_IS_OPEN = 'SET_COLOR_PICKER_IS_OPEN';

// Reducer
export default function reducer( state = false, action ) {
  switch ( action.type ) {
    case SET_COLOR_PICKER_IS_OPEN: {
      return action.payload;
    }
    default:
      return state;
  }
}

// Action Creators
export function setColorPickerIsOpen( value ) {
  return {
    type: SET_COLOR_PICKER_IS_OPEN,
    payload: value,
  };
}
