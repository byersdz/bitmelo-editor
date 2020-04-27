
// constants
export const EDITOR_PAGE = 'EDITOR_PAGE';
export const PROJECTS_PAGE = 'PROJECTS_PAGE';

// Actions
export const SELECT_ACTIVE_PAGE = 'SELECT_ACTIVE_PAGE';

// Reducer
export default function reducer( state = EDITOR_PAGE, action ) {
  switch ( action.type ) {
    case SELECT_ACTIVE_PAGE: {
      return action.payload;
    }
    default:
      return state;
  }
}

// Action Creators
export function selectActivePage( page ) {
  return {
    type: SELECT_ACTIVE_PAGE,
    payload: page,
  };
}
