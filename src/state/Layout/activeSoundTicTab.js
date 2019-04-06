
// Constants
export const VOLUME_TAB = 'volume';
export const PITCH_TAB = 'pitch';
export const ARP_TAB = 'arp';

// Actions
export const SET_SOUND_TIC_TAB = 'SET_SOUND_TIC_TAB';

// Reducer
export default function reducer( state = VOLUME_TAB, action ) {
  switch ( action.type ) {
    case SET_SOUND_TIC_TAB: {
      return action.payload;
    }
    default:
      return state;
  }
}

// Action Creators
export function setSoundTicTab( tab ) {
  return {
    type: SET_SOUND_TIC_TAB,
    payload: tab,
  };
}
