import { RESET_PROJECT, IMPORT_PROJECT_DATA } from '../globalActions';

// Actions
export const SELECT_TILESET = 'SELECT_TILESET';

// reducer
export default function reducer( state = 0, action ) {
  switch ( action.type ) {
    case RESET_PROJECT: {
      return 0;
    }
    case IMPORT_PROJECT_DATA: {
      return 0;
    }
    case SELECT_TILESET: {
      return action.payload;
    }
    default:
      return state;
  }
}

// action creators
export function selectTileset( tilesetIndex ) {
  return {
    type: SELECT_TILESET,
    payload: tilesetIndex,
  };
}
