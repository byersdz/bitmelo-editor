
// Actions
export const SET_SOUND_EDITOR_PIANO_OCTAVE = 'SET_SOUND_EDITOR_PIANO_OCTAVE';

// Reducer
const initialState = {
  pianoOctave: 4,
};

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case SET_SOUND_EDITOR_PIANO_OCTAVE: {
      return { ...state, pianoOctave: action.payload };
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
