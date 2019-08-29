// Actions
export const SET_REFERENCE_TAB_TITLE = 'SET_REFERENCE_TAB_TITLE';

// Reducer
const initialState = 'Reference';

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case SET_REFERENCE_TAB_TITLE: {
      return action.payload;
    }
    default:
      return state;
  }
}

// Action Creators
export function setReferenceTabTitle( title ) {
  return {
    type: SET_REFERENCE_TAB_TITLE,
    payload: title,
  };
}
