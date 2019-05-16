
// Audio Events
export const PIANO_KEY_DOWN = 'PIANO_KEY_DOWN';
export const PIANO_KEY_UP = 'PIANO_KEY_UP';

// Actions
export const CLEAR_AUDIO_EVENTS = 'CLEAR_AUDIO_EVENTS';
export const ADD_AUDIO_EVENT = 'ADD_AUDIO_EVENT';

// Reducer
export default function reducer( state = [], action ) {
  switch ( action.type ) {
    case CLEAR_AUDIO_EVENTS: {
      return [];
    }
    case ADD_AUDIO_EVENT: {
      return [...state, action.payload];
    }
    default:
      return state;
  }
}

// Action Creators
export function clearAudioEvents() {
  return {
    type: CLEAR_AUDIO_EVENTS,
  };
}

export function addAudioEvent( event ) {
  return {
    type: ADD_AUDIO_EVENT,
    payload: event,
  };
}
