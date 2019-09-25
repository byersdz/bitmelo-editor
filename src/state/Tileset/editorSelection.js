import cloneDeep from 'lodash.clonedeep';

// Actions
export const SET_TILESET_EDITOR_SELECTION = 'SET_TILESET_EDITOR_SELECTION';
export const CLEAR_TILESET_EDITOR_SELECTION = 'CLEAR_TILESET_EDITOR_SELECTION';

// Reducer
const initialState = {
  width: 10,
  height: 5,
  offsetX: 1,
  offsetY: 2,
  data: [],
  isActive: true,
};

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case CLEAR_TILESET_EDITOR_SELECTION: {
      return cloneDeep( initialState );
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
