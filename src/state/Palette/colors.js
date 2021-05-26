
import { standardPalette } from 'bitmelo'; // eslint-disable-line
import {
  RESET_PROJECT,
  IMPORT_PROJECT_DATA,
  REPLACE_PALETTE,
  INSERT_PALETTE_COLOR,
} from '../globalActions';

// Actions
export const SET_PALETTE_COLOR = 'SET_PALETTE_COLOR';
export const ADD_PALETTE_COLOR = 'ADD_PALETTE_COLOR';
export const ADD_PALETTE_COLOR_SET = 'ADD_PALETTE_COLOR_SET';
export const DELETE_PALETTE_COLOR = 'DELETE_PALETTE_COLOR';

// validation
export function validate( state ) {
  if ( !Array.isArray( state ) ) {
    return false;
  }

  for ( let i = 0; i < state.length; i += 1 ) {
    if ( typeof state[i] !== 'string' ) {
      return false;
    }
  }

  return true;
}

// Reducer
const initialState = [...standardPalette];

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case RESET_PROJECT: {
      return initialState;
    }
    case IMPORT_PROJECT_DATA: {
      try {
        const importedState = action.payload.palette.colors;
        if ( validate( importedState ) ) {
          return [...importedState];
        }
        return state;
      }
      catch ( e ) {
        return state;
      }
    }
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
    case INSERT_PALETTE_COLOR: {
      if ( state.length > 255 ) {
        return state;
      }
      const { color, index } = action.payload;

      return [...state.slice( 0, index ), color, ...state.slice( index )];
    }
    case ADD_PALETTE_COLOR_SET: {
      const newPalette = [...state, ...action.payload];
      if ( newPalette.length > 256 ) {
        return state;
      }

      return newPalette;
    }
    case REPLACE_PALETTE: {
      const newPalette = [...action.payload.colors];
      if ( newPalette.length > 256 ) {
        return state;
      }

      return newPalette;
    }
    case DELETE_PALETTE_COLOR: {
      const newPalette = [];
      for ( let i = 0; i < state.length; i += 1 ) {
        if ( i === 0 || i !== action.payload ) {
          newPalette.push( state[i] );
        }
      }
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

export function addPaletteColorSet( colorSet ) {
  return {
    type: ADD_PALETTE_COLOR_SET,
    payload: colorSet,
  };
}

export function deletePaletteColor( index ) {
  return {
    type: DELETE_PALETTE_COLOR,
    payload: index,
  };
}
