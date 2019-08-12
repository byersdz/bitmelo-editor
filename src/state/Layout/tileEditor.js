
// Actions
export const SET_TILE_ARTICLE_PATH = 'SET_TILE_ARTICLE_PATH';

// Reducer
const initialState = {
  articlePath: '',
};

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case SET_TILE_ARTICLE_PATH: {
      return { ...state, articlePath: action.payload };
    }
    default: return state;
  }
}

// Action Creators
export function setTileArticlePath( path ) {
  return {
    type: SET_TILE_ARTICLE_PATH,
    payload: path,
  };
}
