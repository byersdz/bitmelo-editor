
import { standardPalette } from 'bitmelo';

// Actions
export const SET_PALETTE_COLOR = 'SET_PALETTE_COLOR';
export const ADD_PALETTE_COLOR = 'ADD_PALETTE_COLOR';

// Reducer
const initialState = standardPalette;

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case SET_PALETTE_COLOR: {
      const newPalette = [...state];
      newPalette[action.payload.index] = action.payload.color;
      return newPalette;
    }
    case ADD_PALETTE_COLOR: {
      const newPalette = [...state];
      if ( newPalette.length > 256 ) { // max number of colors is 256
        return state;
      }
      const color = action.payload ? action.payload : '000000';
      newPalette.push( color );
      return newPalette;
    }
    default:
      return state;
  }
}

// Action Creators
export function setPaletteColor( index, color ) {
  return {
    type: SET_PALETTE_COLOR,
    payload: {
      index,
      color,
    },
  };
}

export function addPaletteColor( color ) {
  return {
    type: ADD_PALETTE_COLOR,
    payload: color,
  };
}
