
// Actions
export const SET_TILE_EDITOR_LAYOUT_SETTINGS = 'SET_TILE_EDITOR_LAYOUT_SETTINGS';

// Reducer
const initialState = {
  showGrid: false,
};

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case SET_TILE_EDITOR_LAYOUT_SETTINGS: {
      return { ...action.payload };
    }
    default: return state;
  }
}

// Action Creators
export function setTileEditorLayoutSettings( settings ) {
  return {
    type: SET_TILE_EDITOR_LAYOUT_SETTINGS,
    payload: settings,
  };
}
