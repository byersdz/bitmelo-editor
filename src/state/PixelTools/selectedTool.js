
import { RESET_PROJECT } from '../globalActions';

// Constants
export const PENCIL_TOOL = 'PENCIL_TOOL';
export const ERASER_TOOL = 'ERASER_TOOL';
export const BUCKET_TOOL = 'BUCKET_TOOL';
export const MOVE_TOOL = 'MOVE_TOOL';
export const RECT_SELECT_TOOL = 'RECT_SELECT_TOOL';
export const LINE_TOOL = 'LINE_TOOL';

// Actions
export const SELECT_PIXEL_TOOL = 'SELECT_PIXEL_TOOL';

// Reducer
const initialState = PENCIL_TOOL;
export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case RESET_PROJECT: {
      return initialState;
    }
    case SELECT_PIXEL_TOOL: {
      return action.payload;
    }
    default:
      return state;
  }
}


// Action Creators
export function selectPixelTool( tool ) {
  return {
    type: SELECT_PIXEL_TOOL,
    payload: tool,
  };
}
