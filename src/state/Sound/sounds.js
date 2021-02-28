
import { Sound } from 'bitmelo';
import get from 'lodash/get';
import { RESET_PROJECT, IMPORT_PROJECT_DATA } from '../globalActions';

// Actions
export const SET_SOUND_DATA = 'SET_SOUND_DATA';
export const ADDED_SOUND_TO_AUDIO_ENGINE = 'ADDED_SOUND_TO_AUDIO_ENGINE';
export const ADD_SOUND = 'ADD_SOUND';
export const DELETE_SOUND = 'DELETE_SOUND';
export const SYNC_SOUND_LOOPS = 'SYNC_SOUND_LOOPS';

// validation
export function validate( state ) {
  if ( !Array.isArray( state ) ) {
    return false;
  }

  if ( state.length < 1 ) {
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

    if ( typeof sound.useVolumeLoop !== 'boolean' ) {
      return false;
    }

    if ( typeof sound.volumeLoopStart !== 'number' ) {
      return false;
    }

    if ( typeof sound.volumeLoopEnd !== 'number' ) {
      return false;
    }

    if ( typeof sound.usePitchLoop !== 'boolean' ) {
      return false;
    }

    if ( typeof sound.pitchLoopStart !== 'number' ) {
      return false;
    }

    if ( typeof sound.pitchLoopEnd !== 'number' ) {
      return false;
    }

    if ( typeof sound.useArpLoop !== 'boolean' ) {
      return false;
    }

    if ( typeof sound.arpLoopStart !== 'number' ) {
      return false;
    }

    if ( typeof sound.arpLoopEnd !== 'number' ) {
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
    useVolumeLoop: false,
    volumeLoopStart: 0,
    volumeLoopEnd: 31,
    usePitchLoop: false,
    pitchLoopStart: 0,
    pitchLoopEnd: 31,
    useArpLoop: false,
    arpLoopStart: 0,
    arpLoopEnd: 31,
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
        const format = get( action, 'payload.format', '' );
        let importedState = null;

        if ( format === 'transfer' ) {
          importedState = [...action.payload.sounds];
        }
        else {
          importedState = [...action.payload.sound.sounds];
        }

        if ( validate( importedState ) ) {
          const newState = [...importedState];
          newState[0].needToAddToAudioEngine = true;

          return newState;
        }
        return state;
      }
      catch ( e ) {
        return state;
      }
    }
    case SYNC_SOUND_LOOPS: {
      const {
        soundIndex,
        // useLoop,
        loopStart,
        loopEnd,
      } = action.payload;
      const newState = [...state];
      newState[soundIndex] = {
        ...state[soundIndex],
        needToAddToAudioEngine: true,
        /*
        useVolumeLoop: useLoop,
        usePitchLoop: useLoop,
        useArpLoop: useLoop,
        */
        volumeLoopStart: loopStart,
        pitchLoopStart: loopStart,
        arpLoopStart: loopStart,
        volumeLoopEnd: loopEnd,
        pitchLoopEnd: loopEnd,
        arpLoopEnd: loopEnd,
      };
      return newState;
    }
    case ADD_SOUND: {
      const newState = [...state];
      newState.push( { ...initialState[0] } );
      return newState;
    }
    case DELETE_SOUND: {
      return [...state.slice( 0, action.payload ), ...state.slice( action.payload + 1 )];
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

export function syncSoundLoops( soundIndex, useLoop, loopStart, loopEnd ) {
  return {
    type: SYNC_SOUND_LOOPS,
    payload: {
      soundIndex,
      useLoop,
      loopStart,
      loopEnd,
    },
  };
}
