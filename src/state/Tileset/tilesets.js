
import { CHANGE_TILE_SIZE } from 'State/Project/tileSize';
import { DELETE_PALETTE_COLOR } from 'State/Palette/colors';

// Actions
export const SET_TILESET_LAYER_DATA = 'SET_TILESET_LAYER_DATA';
export const SET_TILESET_SELECTION = 'SET_TILESET_SELECTION';
export const SET_TILESET_SIZE = 'SET_TILESET_SIZE';

// Reducer
const initialWidth = 8;
const initialHeight = 8;
const initialTileSize = 16;
const initialState = [
  {
    width: 8,
    height: 8,
    selectedTile: 0,
    selectionWidth: 1,
    selectionHeight: 1,
    activeLayer: 0,
    layers: [
      {
        isVisible: true,
        data: new Array( initialWidth * initialHeight * initialTileSize * initialTileSize ),
      },
      {
        isVisible: true,
        data: new Array( initialWidth * initialHeight * initialTileSize * initialTileSize ),
      },
      {
        isVisible: true,
        data: new Array( initialWidth * initialHeight * initialTileSize * initialTileSize ),
      },
      {
        isVisible: true,
        data: new Array( initialWidth * initialHeight * initialTileSize * initialTileSize ),
      },
    ],
  },
];

initialState[0].layers[0].data.fill( 0 );
initialState[0].layers[1].data.fill( 0 );
initialState[0].layers[2].data.fill( 0 );
initialState[0].layers[3].data.fill( 0 );

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case CHANGE_TILE_SIZE: {
      const { newTileSize } = action.payload;
      const newState = [];
      for ( let i = 0; i < state.length; i += 1 ) {
        const oldTileset = state[i];
        const newTileset = { ...oldTileset };
        newTileset.layers = [];
        for ( let j = 0; j < oldTileset.layers.length; j += 1 ) {
          const newLayer = { ...oldTileset.layers[j] };
          newLayer.data = new Array(
            newTileset.width * newTileset.height * newTileSize * newTileSize,
          );
          newLayer.data.fill( 0 );
          newTileset.layers.push( newLayer );
        }

        newState.push( newTileset );
      }
      return newState;
    }
    case DELETE_PALETTE_COLOR: {
      const newState = [];
      for ( let i = 0; i < state.length; i += 1 ) {
        const oldTileset = state[i];
        const newTileset = { ...oldTileset };
        newTileset.layers = [];
        for ( let j = 0; j < oldTileset.layers.length; j += 1 ) {
          const newLayer = { ...oldTileset.layers[j] };
          newLayer.data = [...oldTileset.layers[j].data];
          for ( let k = 0; k < newLayer.data.length; k += 1 ) {
            const color = newLayer.data[k];
            if ( color === action.payload ) {
              newLayer.data[k] = 0;
            }
            else if ( color > action.payload ) {
              newLayer.data[k] = color - 1;
            }
          }
          newTileset.layers.push( newLayer );
        }

        newState.push( newTileset );
      }
      return newState;
    }

    case SET_TILESET_SIZE: {
      const {
        tilesetIndex,
        columns,
        rows,
        tileSize,
      } = action.payload;
      const oldTileset = state[tilesetIndex];
      const newState = [...state];
      newState[tilesetIndex] = { ...state[tilesetIndex] };
      newState[tilesetIndex].width = columns;
      newState[tilesetIndex].height = rows;
      newState[tilesetIndex].selectedTile = 0;
      newState[tilesetIndex].selectionWidth = 1;
      newState[tilesetIndex].selectionHeight = 1;

      newState[tilesetIndex].layers = [];
      for ( let i = 0; i < oldTileset.layers.length; i += 1 ) {
        const newLayer = { ...oldTileset.layers[i] };
        newLayer.data = new Array( columns * rows * tileSize * tileSize );
        newLayer.data.fill( 0 );
        for ( let y = 0; y < oldTileset.height * tileSize; y += 1 ) {
          for ( let x = 0; x < oldTileset.width * tileSize; x += 1 ) {
            const sourceIndex = y * oldTileset.width * tileSize + x;
            const sourcePaletteId = oldTileset.layers[i].data[sourceIndex];
            const destinationIndex = y * newState[tilesetIndex].width * tileSize + x;
            if (
              x < newState[tilesetIndex].width * tileSize
              && y < newState[tilesetIndex].height * tileSize
            ) {
              newLayer.data[destinationIndex] = sourcePaletteId;
            }
          }
        }
        newState[tilesetIndex].layers.push( newLayer );
      }
      return newState;
    }
    case SET_TILESET_LAYER_DATA: {
      const {
        data,
        tilesetIndex,
        layerIndex,
        selection,
      } = action.payload;
      const newState = [...state];
      newState[tilesetIndex] = { ...state[tilesetIndex] };
      newState[tilesetIndex].layers = [...state[tilesetIndex].layers];
      newState[tilesetIndex].layers[layerIndex] = { ...state[tilesetIndex].layers[layerIndex] };

      if ( selection ) {
        const {
          selectedTile,
          selectionWidth,
          selectionHeight,
          tileSize,
        } = selection;
        newState[tilesetIndex].layers[layerIndex].data = [...newState[tilesetIndex].layers[layerIndex].data];
        let sourceIndex = 0;
        let destinationIndex = 0;
        const originX = ( selectedTile % newState[tilesetIndex].width ) * tileSize;
        const originY = Math.floor( selectedTile / newState[tilesetIndex].width ) * tileSize;
        const sourceWidth = selectionWidth * tileSize;
        const sourceHeight = selectionHeight * tileSize;

        const destinationWidth = newState[tilesetIndex].width * tileSize;
        for ( let y = 0; y < sourceHeight; y += 1 ) {
          for ( let x = 0; x < sourceWidth; x += 1 ) {
            sourceIndex = y * sourceWidth + x;
            destinationIndex = ( y + originY ) * destinationWidth + x + originX;
            newState[tilesetIndex].layers[layerIndex].data[destinationIndex] = data[sourceIndex];
          }
        }
      }
      else {
        newState[tilesetIndex].layers[layerIndex].data = [...data];
      }
      return newState;
    }

    case SET_TILESET_SELECTION: {
      const { selection, tilesetIndex } = action.payload;
      const { selectedTile, selectionWidth, selectionHeight } = selection;
      const newState = [...state];
      newState[tilesetIndex] = { ...state[tilesetIndex] };
      newState[tilesetIndex].selectedTile = selectedTile;
      newState[tilesetIndex].selectionWidth = selectionWidth;
      newState[tilesetIndex].selectionHeight = selectionHeight;
      return newState;
    }

    default:
      return state;
  }
}

// Action Creators
export function setTilesetLayerData( data, tilesetIndex, layerIndex, selection ) {
  return {
    type: SET_TILESET_LAYER_DATA,
    payload: {
      data,
      tilesetIndex,
      layerIndex,
      selection,
    },
  };
}

export function setTilesetSelection( selection, tilesetIndex ) {
  return {
    type: SET_TILESET_SELECTION,
    payload: { selection, tilesetIndex },
  };
}

export function setTilesetSize( tilesetIndex, tileSize, columns, rows ) {
  return {
    type: SET_TILESET_SIZE,
    payload: {
      tilesetIndex,
      tileSize,
      columns,
      rows,
    },
  };
}
