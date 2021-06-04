import cloneDeep from 'lodash/cloneDeep';
import flipGrid from '../../utils/Grid/flipGrid';

import {
  CREATE_TILESET_EDITOR_SELECTION,
  APPLY_TILESET_EDITOR_SELECTION,
  REPOSITION_TILESET_EDITOR_SELECTION,
} from './actions';

// Actions
export const SET_TILESET_EDITOR_SELECTION = 'SET_TILESET_EDITOR_SELECTION';
export const CLEAR_TILESET_EDITOR_SELECTION = 'CLEAR_TILESET_EDITOR_SELECTION';
export const FLIP_TILESET_EDITOR_SELECTION = 'FLIP_TILESET_EDITOR_SELECTION';
export const ROTATE_TILESET_EDITOR_SELECTION = 'ROTATE_TILESET_EDITOR_SELECTION';

// Reducer
const initialState = {
  width: 0,
  height: 0,
  offsetX: 0,
  offsetY: 0,
  data: [],
  isActive: false,
};

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case FLIP_TILESET_EDITOR_SELECTION: {
      const { horizontal, vertical } = action.payload;
      const newState = cloneDeep( state );
      newState.data = flipGrid( state.data, state.width, state.height, horizontal, vertical );
      return newState;
    }
    case ROTATE_TILESET_EDITOR_SELECTION: {
      const degrees = action.payload;
      const newState = cloneDeep( state );
      newState.data = new Array( state.width * state.height );

      if ( degrees === 90 ) {
        // rotate clockwise
        newState.width = state.height;
        newState.height = state.width;
        for ( let y = 0; y < state.height; y += 1 ) {
          for ( let x = 0; x < state.width; x += 1 ) {
            const refId = state.data[y * state.width + x];
            newState.data[( state.width - x - 1 ) * newState.width + y] = refId;
          }
        }
      }
      else if ( degrees === -90 ) {
        // rotate counter clockwise
        newState.width = state.height;
        newState.height = state.width;
        for ( let y = 0; y < state.height; y += 1 ) {
          for ( let x = 0; x < state.width; x += 1 ) {
            const refId = state.data[y * state.width + x];
            newState.data[x * newState.width + ( state.height - y - 1 )] = refId;
          }
        }
      }

      return newState;
    }
    case APPLY_TILESET_EDITOR_SELECTION: {
      return cloneDeep( initialState );
    }
    case CLEAR_TILESET_EDITOR_SELECTION: {
      return cloneDeep( initialState );
    }
    case REPOSITION_TILESET_EDITOR_SELECTION: {
      const newState = cloneDeep( action.payload.newEditorSelection );
      return newState;
    }
    case CREATE_TILESET_EDITOR_SELECTION: {
      const newState = cloneDeep( action.payload.editorSelection );
      return newState;
    }
    case SET_TILESET_EDITOR_SELECTION: {
      const newState = cloneDeep( action.payload );
      return newState;
    }
    default:
      return state;
  }
}

// Action Creators
export function setTilesetEditorSelection( selectionData ) {
  return {
    type: SET_TILESET_EDITOR_SELECTION,
    payload: selectionData,
  };
}

export function clearTilesetEditorSelection() {
  return {
    type: CLEAR_TILESET_EDITOR_SELECTION,
  };
}

export function flipTilesetEditorSelection( horizontal = false, vertical = false ) {
  return {
    type: FLIP_TILESET_EDITOR_SELECTION,
    payload: {
      horizontal,
      vertical,
    },
  };
}

export function rotateTilesetEditorSelection( degrees ) {
  return {
    type: ROTATE_TILESET_EDITOR_SELECTION,
    payload: degrees,
  };
}
