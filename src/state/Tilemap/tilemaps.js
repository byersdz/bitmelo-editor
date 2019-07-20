
import cloneDeep from 'lodash.clonedeep';

import { RESET_PROJECT } from 'State/globalActions';

// Actions
export const SET_TILEMAP_LAYER_DATA = 'SET_TILEMAP_LAYER_DATA';
export const SET_TILEMAP_NAME = 'SET_TILEMAP_NAME';
export const ADD_TILEMAP = 'ADD_TILEMAP';
export const DELETE_TILEMAP = 'DELETE_TILEMAP';

// Reducer
const initialWidth = 24;
const initialHeight = 16;
const initialState = [
  {
    name: 'untitled',
    width: initialWidth,
    height: initialHeight,
    activeLayer: 0,
    layers: [
      {
        isVisible: true,
        data: new Array( initialWidth * initialHeight ),
      },
    ],
  },
];

initialState[0].layers[0].data.fill( 0 );

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case RESET_PROJECT: {
      return initialState;
    }
    case DELETE_TILEMAP: {
      return [...state.slice( 0, action.payload ), ...state.slice( action.payload + 1 )];
    }
    case ADD_TILEMAP: {
      const newState = [...state];
      newState.push( cloneDeep( initialState[0] ) );
      return newState;
    }
    case SET_TILEMAP_LAYER_DATA: {
      const {
        data,
        tilemapIndex,
        layerIndex,
      } = action.payload;
      const newState = [...state];
      newState[tilemapIndex] = { ...state[tilemapIndex] };
      newState[tilemapIndex].layers = [...state[tilemapIndex].layers];
      newState[tilemapIndex].layers[layerIndex] = { ...state[tilemapIndex].layers[layerIndex] };
      newState[tilemapIndex].layers[layerIndex].data = [...data];
      return newState;
    }
    default: {
      return state;
    }
  }
}

// Action Creators
export function setTilemapLayerData( data, tilemapIndex, layerIndex ) {
  return {
    type: SET_TILEMAP_LAYER_DATA,
    payload: {
      data,
      tilemapIndex,
      layerIndex,
    },
  };
}

export function setTilemapName( tilemapIndex, name ) {
  return {
    type: SET_TILEMAP_NAME,
    payload: {
      tilemapIndex,
      name,
    },
  };
}

export function addTilemap() {
  return {
    type: ADD_TILEMAP,
  };
}

export function deleteTilemap( index ) {
  return {
    type: DELETE_TILEMAP,
    payload: index,
  };
}
