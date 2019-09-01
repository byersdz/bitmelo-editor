
// Actions
export const TOGGLE_NAVIGATION_PANEL = 'TOGGLE_NAVIGATION_PANEL';
export const SET_NAVIGATION_PANEL_IS_OPEN = 'SET_NAVIGATION_PANEL_IS_OPEN';

// Reducer
export default function reducer( state = true, action ) {
  switch ( action.type ) {
    case TOGGLE_NAVIGATION_PANEL: {
      return !state;
    }
    case SET_NAVIGATION_PANEL_IS_OPEN: {
      return action.payload;
    }
    default:
      return state;
  }
}

// Action Creators
export function toggleNavigationPanel() {
  return {
    type: TOGGLE_NAVIGATION_PANEL,
  };
}

export function setNavigationPanelIsOpen( value ) {
  return {
    type: SET_NAVIGATION_PANEL_IS_OPEN,
    payload: value,
  };
}
