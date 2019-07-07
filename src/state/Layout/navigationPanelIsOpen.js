
// Actions
export const TOGGLE_NAVIGATION_PANEL = 'TOGGLE_NAVIGATION_PANEL';

// Reducer
export default function reducer( state = true, action ) {
  switch ( action.type ) {
    case TOGGLE_NAVIGATION_PANEL: {
      return !state;
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
