
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import merge from 'lodash/merge';
import { ConvertData } from 'bitmelo';

import { RESET_PROJECT, IMPORT_PROJECT_DATA } from '../globalActions';

// Actions
export const SET_TILEMAP_LAYER_DATA = 'SET_TILEMAP_LAYER_DATA';
export const SET_TILEMAP_NAME = 'SET_TILEMAP_NAME';
export const ADD_TILEMAP = 'ADD_TILEMAP';
export const DELETE_TILEMAP = 'DELETE_TILEMAP';
export const SET_TILEMAP_SIZE = 'SET_TILEMAP_SIZE';

// validation
export function validate( state ) {
  if ( !Array.isArray( state ) ) {
    return false;
  }

  for ( let i = 0; i < state.length; i += 1 ) {
    const tilemap = state[i];
    if ( typeof tilemap !== 'object' ) {
      return false;
    }

    if ( typeof tilemap.width !== 'number' ) {
      return false;
    }

    if ( typeof tilemap.height !== 'number' ) {
      return false;
    }

    if ( typeof tilemap.activeLayer !== 'number' ) {
      return false;
    }

    if ( !Array.isArray( tilemap.layers ) ) {
      return false;
    }

    if ( tilemap.layers.length <= 0 ) {
      return false;
    }

    for ( let j = 0; j < tilemap.layers.length; j += 1 ) {
      const layer = tilemap.layers[j];

      if ( typeof layer !== 'object' ) {
        return false;
      }

      if ( typeof layer.isVisible !== 'boolean' ) {
        return false;
      }

      if ( !layer.format || layer.format === 'array' || layer.format === 'run' ) {
        if ( !Array.isArray( layer.data ) ) {
          return false;
        }
      }
      else if ( layer.format === 'rc' || layer.format === 'c' ) {
        if ( typeof layer.data !== 'string' ) {
          return false;
        }
      }
    }
  }

  return true;
}

function modifyImportedState( state ) {
  const newState = cloneDeep( state );

  // convert any compressed data into flat arrays
  for ( let i = 0; i < newState.length; i += 1 ) {
    const currentTilemap = newState[i];

    for ( let j = 0; j < currentTilemap.layers.length; j += 1 ) {
      const layer = currentTilemap.layers[j];

      if ( layer.format && layer.format === 'rc' ) {
        const runArray = ConvertData.compressedStringToArray( layer.data );
        layer.data = ConvertData.runToArray( runArray );
        layer.format = 'array';
      }
    }
  }

  return newState;
}

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
    case IMPORT_PROJECT_DATA: {
      try {
        const format = get( action, 'payload.format', '' );

        let importedState = null;
        if ( format === 'transfer' ) {
          importedState = [...action.payload.tilemaps];

          for ( let i = 0; i < importedState.length; i += 1 ) {
            importedState[i] = merge( {}, initialState[0], importedState[i] );
          }
        }
        else {
          importedState = [...action.payload.tilemap.tilemaps];
        }

        if ( validate( importedState ) ) {
          return modifyImportedState( importedState );
        }
        return state;
      }
      catch ( e ) {
        return state;
      }
    }
    case DELETE_TILEMAP: {
      return [...state.slice( 0, action.payload ), ...state.slice( action.payload + 1 )];
    }
    case ADD_TILEMAP: {
      const newState = [...state];
      newState.push( cloneDeep( initialState[0] ) );
      return newState;
    }
    case SET_TILEMAP_NAME: {
      const { tilemapIndex, name } = action.payload;
      const newState = [...state];
      newState[tilemapIndex] = { ...state[tilemapIndex] };
      newState[tilemapIndex].name = name;
      return newState;
    }
    case SET_TILEMAP_SIZE: {
      const {
        tilemapIndex,
        columns,
        rows,
      } = action.payload;

      const newState = [...state];
      const oldTilemap = state[tilemapIndex];
      const newTilemap = { ...oldTilemap };
      newTilemap.width = columns;
      newTilemap.height = rows;

      newTilemap.layers = [];
      for ( let i = 0; i < oldTilemap.layers.length; i += 1 ) {
        const newLayer = { ...oldTilemap.layers[i] };
        newLayer.data = new Array( columns * rows );
        newLayer.data.fill( 0 );
        for ( let y = 0; y < oldTilemap.height; y += 1 ) {
          for ( let x = 0; x < oldTilemap.width; x += 1 ) {
            const sourceIndex = y * oldTilemap.width + x;
            const sourceTileId = oldTilemap.layers[i].data[sourceIndex];
            const destinationIndex = y * newTilemap.width + x;
            if (
              x < newTilemap.width
              && y < newTilemap.height
            ) {
              newLayer.data[destinationIndex] = sourceTileId;
            }
          }
        }
        newTilemap.layers.push( newLayer );
      }

      newState[tilemapIndex] = newTilemap;
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

export function setTilemapSize( tilemapIndex, columns, rows ) {
  return {
    type: SET_TILEMAP_SIZE,
    payload: {
      tilemapIndex,
      columns,
      rows,
    },
  };
}
