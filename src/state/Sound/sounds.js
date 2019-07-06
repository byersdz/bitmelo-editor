
import { Sound } from 'bitmelo';
import { RESET_PROJECT } from 'State/globalActions';

// Actions
export const SET_SOUND_DATA = 'SET_SOUND_DATA';
export const ADDED_SOUND_TO_AUDIO_ENGINE = 'ADDED_SOUND_TO_AUDIO_ENGINE';

// Reducer
const initialState = new Array( 256 );

for ( let i = 0; i < 256; i += 1 ) {
  initialState[i] = {
    volumeTics: new Array( 32 ),
    pitchTics: new Array( 32 ),
    arpTics: new Array( 32 ),
    pitchScale: 10,
    wave: 0,
    loopStart: 0,
    loopEnd: 31,
    useLoop: false,
    name: '',
    releaseLength: 1,
    releaseMode: Sound.RELEASE_LINEAR,
    needToAddToAudioEngine: false,
  };

  initialState[i].volumeTics.fill( 15 );
  initialState[i].pitchTics.fill( 0 );
  initialState[i].arpTics.fill( 0 );
}

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case RESET_PROJECT: {
      return initialState;
    }
    case SET_SOUND_DATA: {
      const newState = [...state];
      const { soundIndex, data } = action.payload;
      newState[soundIndex] = { ...data, needToAddToAudioEngine: true };
      return newState;
    }
    case ADDED_SOUND_TO_AUDIO_ENGINE: {
      const newState = [...state];
      newState[action.payload].needToAddToAudioEngine = false;
      return newState;
    }
    default:
      return state;
  }
}

// Action Creators
export function setSoundData( soundIndex, data ) {
  return {
    type: SET_SOUND_DATA,
    payload: { soundIndex, data },
  };
}

export function addedSoundToAudioEngine( soundIndex ) {
  return {
    type: ADDED_SOUND_TO_AUDIO_ENGINE,
    payload: soundIndex,
  };
}
