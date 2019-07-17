
import { RESET_PROJECT } from 'State/globalActions';

// Actions
export const SET_TILEMAP_LAYER_DATA = 'SET_TILEMAP_LAYER_DATA';

// Reducer
const initialWidth = 32;
const initialHeight = 32;
const initialState = [
  {
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
