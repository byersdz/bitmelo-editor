
import { RESET_PROJECT } from '../globalActions';

// Constants
export const TILE_DRAW_TOOL = 'TILE_DRAW_TOOL';
export const TILE_ERASE_TOOL = 'TILE_ERASE_TOOL';

// Actions
export const SELECT_TILE_TOOL = 'SELECT_TILE_TOOL';

// Reducer
const initialState = TILE_DRAW_TOOL;
export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case RESET_PROJECT: {
      return initialState;
    }
    case SELECT_TILE_TOOL: {
      return action.payload;
    }
    default:
      return state;
  }
}


// Action Creators
export function selectTileTool( tool ) {
  return {
    type: SELECT_TILE_TOOL,
    payload: tool,
  };
}
