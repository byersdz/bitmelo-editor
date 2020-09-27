// Actions
export const SET_MODAL_COUNT = 'SET_MODAL_COUNT';
export const INCREASE_MODAL_COUNT = 'INCREASE_MODAL_COUNT';
export const DECREASE_MODAL_COUNT = 'DECREASE_MODAL_COUNT';

// Reducer
export default function reducer( state = false, action ) {
  switch ( action.type ) {
    case SET_MODAL_COUNT: {
      return action.payload;
    }
    case INCREASE_MODAL_COUNT: {
      return state + 1;
    }
    case DECREASE_MODAL_COUNT: {
      return state - 1;
    }
    default:
      return state;
  }
}

// Action Creators
export function setModalCount( value ) {
  return {
    type: SET_MODAL_COUNT,
    payload: value,
  };
}

export function increaseModalCount() {
  return { type: INCREASE_MODAL_COUNT };
}

export function decreaseModalCount() {
  return { type: DECREASE_MODAL_COUNT };
}
