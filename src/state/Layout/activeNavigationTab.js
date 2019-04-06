
// Constants
export const PROJECT_TAB = 'play';
export const PLAY_TAB = 'play';
export const CODE_TAB = 'code';
export const TILE_TAB = 'tile';
export const TILEMAP_TAB = 'tilemap';
export const SPRITE_TAB = 'sprite';
export const SOUND_TAB = 'sound';
export const MUSIC_TAB = 'music';

// Actions
export const SELECT_NAVIGATION_TAB = 'SELECT_NAVIGATION_TAB';

// Reducer
export default function reducer( state = SOUND_TAB, action ) {
  switch ( action.type ) {
    case SELECT_NAVIGATION_TAB: {
      return action.payload;
    }
    default:
      return state;
  }
}

// Action Creators
export function selectNavigationTab( tab ) {
  return {
    type: SELECT_NAVIGATION_TAB,
    payload: tab,
  };
}
