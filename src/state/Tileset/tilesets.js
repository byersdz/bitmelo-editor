
// Actions
export const UNDO_TILESET_DATA = 'UNDO_TILESET_DATA';
export const REDO_TILESET_DATA = 'REDO_TILESET_DATA';
export const SET_TILESET_LAYER_DATA = 'SET_TILESET_LAYER_DATA';
export const SET_TILESET_SELECTION = 'SET_TILESET_SELECTION';

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

initialState[0].layers[0].data.fill( 2 );
initialState[0].layers[1].data.fill( 0 );
initialState[0].layers[2].data.fill( 0 );
initialState[0].layers[3].data.fill( 0 );

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
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
