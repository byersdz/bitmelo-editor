
// Actions
export const UNDO_TILESET_DATA = 'UNDO_TILESET_DATA';
export const REDO_TILESET_DATA = 'REDO_TILESET_DATA';
export const SET_TILESET_LAYER_DATA = 'SET_TILESET_LAYER_DATA';
export const SET_TILESET_SELECTION = 'SET_TILESET_SELECTION';

// Reducer
const initialWidth = 8;
const initialHeight = 8;
const tileSize = 16;
const initialState = [
  {
    width: 8,
    height: 8,
    selectedTile: 9,
    selectionWidth: 2,
    selectionHeight: 4,
    activeLayer: 0,
    layers: [
      {
        isVisible: true,
        data: new Array( initialWidth * initialHeight * tileSize * tileSize ),
      },
      {
        isVisible: true,
        data: new Array( initialWidth * initialHeight * tileSize * tileSize ),
      },
      {
        isVisible: true,
        data: new Array( initialWidth * initialHeight * tileSize * tileSize ),
      },
      {
        isVisible: true,
        data: new Array( initialWidth * initialHeight * tileSize * tileSize ),
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
      const { data, tilesetIndex, layerIndex } = action.payload;
      const newState = [...state];
      newState[tilesetIndex] = { ...state[tilesetIndex] };
      newState[tilesetIndex].layers = [...state[tilesetIndex].layers];
      newState[tilesetIndex].layers[layerIndex] = { ...state[tilesetIndex].layers[layerIndex] };
      newState[tilesetIndex].layers[layerIndex].data = [...data];
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
export function setTilesetLayerData( data, tilesetIndex, layerIndex ) {
  return {
    type: SET_TILESET_LAYER_DATA,
    payload: { data, tilesetIndex, layerIndex },
  };
}

export function setTilesetSelection( selection, tilesetIndex ) {
  return {
    type: SET_TILESET_SELECTION,
    payload: { selection, tilesetIndex },
  };
}
