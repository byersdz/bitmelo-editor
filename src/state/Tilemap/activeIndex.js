import { RESET_PROJECT, IMPORT_PROJECT_DATA } from '../globalActions';

// Actions
export const SELECT_TILEMAP = 'SELECT_TILEMAP';

// reducer
export default function reducer( state = 0, action ) {
  switch ( action.type ) {
    case RESET_PROJECT: {
      return 0;
    }
    case IMPORT_PROJECT_DATA: {
      return 0;
    }
    case SELECT_TILEMAP: {
      return action.payload;
    }
    default:
      return state;
  }
}

// action creators
export function selectTilemap( tilemapIndex ) {
  return {
    type: SELECT_TILEMAP,
    payload: tilemapIndex,
  };
}
