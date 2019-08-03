
// Actions
export const SET_SOUND_EDITOR_PIANO_OCTAVE = 'SET_SOUND_EDITOR_PIANO_OCTAVE';
export const SET_LAST_SOUND_TICS = 'SET_LAST_SOUND_TICS';

// Reducer
const initialState = {
  pianoOctave: 4,
  lastVolumeTic: -1,
  lastPitchTic: -1,
  lastArpTic: -1,
};

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case SET_SOUND_EDITOR_PIANO_OCTAVE: {
      return { ...state, pianoOctave: action.payload };
    }
    case SET_LAST_SOUND_TICS: {
      return {
        ...state,
        lastVolumeTic: action.payload.volume,
        lastPitchTic: action.payload.pitch,
        lastArpTic: action.payload.arp,
      };
    }
    default:
      return state;
  }
}


// Action Creators
export function setSoundEditorPianoOctave( octave ) {
  return {
    type: SET_SOUND_EDITOR_PIANO_OCTAVE,
    payload: octave,
  };
}

export function setLastSoundTics( volume, pitch, arp ) {
  return {
    type: SET_LAST_SOUND_TICS,
    payload: {
      volume,
      pitch,
      arp,
    },
  };
}
