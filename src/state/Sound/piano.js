
// Actions
export const SET_SOUND_PIANO_SPEED = 'SET_SOUND_PIANO_SPEED';
export const SET_SOUND_PIANO_VOLUME = 'SET_SOUND_PIANO_VOLUME';

// Reducer
const initialState = {
  speed: 0,
  volume: 0.75,
};

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case SET_SOUND_PIANO_SPEED: {
      return { ...state, speed: action.payload };
    }
    case SET_SOUND_PIANO_VOLUME: {
      return { ...state, volume: action.payload };
    }
    default:
      return state;
  }
}

// Action Creators
export function setSoundPianoSpeed( speed ) {
  return {
    type: SET_SOUND_PIANO_SPEED,
    payload: speed,
  };
}

export function setSoundPianoVolume( volume ) {
  return {
    type: SET_SOUND_PIANO_VOLUME,
    payload: volume,
  };
}
