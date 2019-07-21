
import { Sound } from 'bitmelo';
import { RESET_PROJECT, IMPORT_PROJECT_DATA } from 'State/globalActions';

// Actions
export const SET_SOUND_DATA = 'SET_SOUND_DATA';
export const ADDED_SOUND_TO_AUDIO_ENGINE = 'ADDED_SOUND_TO_AUDIO_ENGINE';
export const ADD_SOUND = 'ADD_SOUND';
export const DELETE_SOUND = 'DELETE_SOUND';

// validation
export function validate( state ) {
  if ( !Array.isArray( state ) ) {
    return false;
  }

  for ( let i = 0; i < state.length; i += 1 ) {
    const sound = state[i];
    if ( typeof sound !== 'object' ) {
      return false;
    }

    if ( !Array.isArray( sound.volumeTics ) ) {
      return false;
    }

    if ( sound.volumeTics.length !== 32 ) {
      return false;
    }

    if ( !Array.isArray( sound.pitchTics ) ) {
      return false;
    }

    if ( sound.pitchTics.length !== 32 ) {
      return false;
    }

    if ( !Array.isArray( sound.arpTics ) ) {
      return false;
    }

    if ( sound.arpTics.length !== 32 ) {
      return false;
    }

    if ( typeof sound.pitchScale !== 'number' ) {
      return false;
    }

    if ( typeof sound.wave !== 'number' ) {
      return false;
    }

    if ( typeof sound.loopStart !== 'number' ) {
      return false;
    }

    if ( typeof sound.loopEnd !== 'number' ) {
      return false;
    }

    if ( typeof sound.useLoop !== 'boolean' ) {
      return false;
    }

    if ( typeof sound.name !== 'string' ) {
      return false;
    }

    if ( typeof sound.releaseLength !== 'number' ) {
      return false;
    }

    if ( typeof sound.releaseMode !== 'string' ) {
      return false;
    }
  }

  return true;
}

// Reducer
const initialState = [
  {
    volumeTics: new Array( 32 ),
    pitchTics: new Array( 32 ),
    arpTics: new Array( 32 ),
    pitchScale: 100,
    wave: 0,
    loopStart: 0,
    loopEnd: 31,
    useLoop: false,
    name: '',
    releaseLength: 1,
    releaseMode: Sound.RELEASE_LINEAR,
    needToAddToAudioEngine: false,
  },
];

initialState[0].volumeTics.fill( 15 );
initialState[0].pitchTics.fill( 0 );
initialState[0].arpTics.fill( 0 );

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case RESET_PROJECT: {
      return initialState;
    }
    case IMPORT_PROJECT_DATA: {
      try {
        const importedState = action.payload.sound.sounds;
        if ( validate( importedState ) ) {
          return [...importedState];
        }
        return state;
      }
      catch ( e ) {
        return state;
      }
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

export function addSound() {
  return {
    type: ADD_SOUND,
  };
}

export function deleteSound( soundIndex ) {
  return {
    type: DELETE_SOUND,
    payload: soundIndex,
  };
}
