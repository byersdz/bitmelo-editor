
import { RESET_PROJECT } from '../globalActions';

// Constants
export const VOLUME_TAB = 'volume';
export const PITCH_TAB = 'pitch';
export const ARP_TAB = 'arp';

// Actions
export const SET_SOUND_TIC_TAB = 'SET_SOUND_TIC_TAB';

// Reducer
const initialState = VOLUME_TAB;

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case RESET_PROJECT: {
      return initialState;
    }
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
