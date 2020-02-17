// Actions
export const SET_ANY_MODAL_IS_OPEN = 'SET_ANY_MODAL_IS_OPEN';

// Reducer
export default function reducer( state = false, action ) {
  switch ( action.type ) {
    case SET_ANY_MODAL_IS_OPEN: {
      return action.payload;
    }
    default:
      return state;
  }
}

// Action Creators
export function setAnyModalIsOpen( value ) {
  return {
    type: SET_ANY_MODAL_IS_OPEN,
    payload: value,
  };
}
