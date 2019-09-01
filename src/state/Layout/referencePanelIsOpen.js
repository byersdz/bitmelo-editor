// Actions
export const TOGGLE_REFERENCE_PANEL = 'TOGGLE_REFERENCE_PANEL';
export const SET_REFERENCE_PANEL_IS_OPEN = 'SET_REFERENCE_PANEL_IS_OPEN';

// Reducer
export default function reducer( state = true, action ) {
  switch ( action.type ) {
    case TOGGLE_REFERENCE_PANEL: {
      return !state;
    }
    case SET_REFERENCE_PANEL_IS_OPEN: {
      return action.payload;
    }
    default:
      return state;
  }
}

// Action Creators
export function toggleReferencePanel() {
  return {
    type: TOGGLE_REFERENCE_PANEL,
  };
}

export function setReferencePanelIsOpen( value ) {
  return {
    type: SET_REFERENCE_PANEL_IS_OPEN,
    payload: value,
  };
}
