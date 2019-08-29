// Actions
export const TOGGLE_REFERENCE_PANEL = 'TOGGLE_REFERENCE_PANEL';

// Reducer
export default function reducer( state = true, action ) {
  switch ( action.type ) {
    case TOGGLE_REFERENCE_PANEL: {
      return !state;
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
