import cloneDeep from 'lodash.clonedeep';

import { CHANGE_TILE_SIZE } from 'State/Project/tileSize';
import { DELETE_PALETTE_COLOR } from 'State/Palette/colors';
import { RESET_PROJECT, IMPORT_PROJECT_DATA } from 'State/globalActions';
import {
  CREATE_TILESET_EDITOR_SELECTION,
  APPLY_TILESET_EDITOR_SELECTION,
  REPOSITION_TILESET_EDITOR_SELECTION,
} from './actions';

// Actions
export const SET_TILESET_LAYER_DATA = 'SET_TILESET_LAYER_DATA';
export const SET_TILESET_SELECTION = 'SET_TILESET_SELECTION';
export const SET_TILESET_MAP_SELECTION = 'SET_TILESET_MAP_SELECTION';
export const SET_TILESET_SIZE = 'SET_TILESET_SIZE';

// validation
export function validate( state ) {
  if ( !Array.isArray( state ) ) {
    return false;
  }

  for ( let i = 0; i < state.length; i += 1 ) {
    const tileset = state[i];
    if ( typeof tileset !== 'object' ) {
      return false;
    }

    if ( typeof tileset.width !== 'number' ) {
      return false;
    }

    if ( typeof tileset.height !== 'number' ) {
      return false;
    }

    if ( typeof tileset.selectedTile !== 'number' ) {
      return false;
    }

    if ( typeof tileset.selectionWidth !== 'number' ) {
      return false;
    }

    if ( typeof tileset.selectionHeight !== 'number' ) {
      return false;
    }

    if ( typeof tileset.activeLayer !== 'number' ) {
      return false;
    }

    if ( !Array.isArray( tileset.layers ) ) {
      return false;
    }

    if ( tileset.layers.length <= 0 ) {
      return false;
    }

    for ( let j = 0; j < tileset.layers.length; j += 1 ) {
      const layer = tileset.layers[j];

      if ( typeof layer !== 'object' ) {
        return false;
      }

      if ( typeof layer.isVisible !== 'boolean' ) {
        return false;
      }

      if ( !Array.isArray( layer.data ) ) {
        return false;
      }
    }
  }

  return true;
}

// Reducer
const initialWidth = 8;
const initialHeight = 8;
const initialTileSize = 16;
const initialState = [
  {
    width: initialWidth,
    height: initialHeight,
    selectedTile: 0,
    selectionWidth: 1,
    selectionHeight: 1,
    mapSelectedTile: 0,
    mapSelectionWidth: 1,
    mapSelectionHeight: 1,
    activeLayer: 0,
    layers: [
      {
        isVisible: true,
        data: new Array( initialWidth * initialHeight * initialTileSize * initialTileSize ),
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
        const importedState = action.payload.tileset.tilesets;
        if ( validate( importedState ) ) {
          const newState = [...importedState];
          for ( let i = 0; i < newState.length; i += 1 ) {
            newState[i].selectedTile = 0;
            newState[i].selectionWidth = 1;
            newState[i].selectionHeight = 1;
            newState[i].mapSelectedTile = 0;
            newState[i].mapSelectionWidth = 1;
            newState[i].mapSelectionHeight = 1;
          }
          return newState;
        }
        return state;
      }
      catch ( e ) {
        return state;
      }
    }
    case CHANGE_TILE_SIZE: {
      const { newTileSize } = action.payload;
      const newState = [];
      const maxDimension = Math.floor( 256 / newTileSize );
      for ( let i = 0; i < state.length; i += 1 ) {
        const oldTileset = state[i];
        const newTileset = { ...oldTileset };

        if ( newTileset.width > maxDimension ) {
          newTileset.width = maxDimension;
        }

        if ( newTileset.height > maxDimension ) {
          newTileset.height = maxDimension;
        }

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
      newState[tilesetIndex].mapSelectedTile = 0;
      newState[tilesetIndex].mapSelectionWidth = 1;
      newState[tilesetIndex].mapSelectionHeight = 1;

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
    case REPOSITION_TILESET_EDITOR_SELECTION: {
      const {
        tilesetIndex,
        layerIndex,
        selection,
        oldEditorSelection,
        newEditorSelection,
      } = action.payload;

      const {
        selectedTile,
        tileSize,
        selectionWidth,
        selectionHeight,
      } = selection;

      const newState = cloneDeep( state );
      const layerData = newState[tilesetIndex].layers[layerIndex].data;

      const originX = ( selectedTile % newState[tilesetIndex].width ) * tileSize;
      const originY = Math.floor( selectedTile / newState[tilesetIndex].width ) * tileSize;
      const destinationWidth = newState[tilesetIndex].width * tileSize;

      for ( let y = 0; y < oldEditorSelection.height; y += 1 ) {
        for ( let x = 0; x < oldEditorSelection.width; x += 1 ) {
          const offsetX = x + oldEditorSelection.offsetX;
          const offsetY = y + oldEditorSelection.offsetY;

          if (
            offsetX >= 0
            && offsetX < selectionWidth * tileSize
            && offsetY >= 0
            && offsetY < selectionHeight * tileSize
          ) {
            const sourceIndex = y * oldEditorSelection.width + x;
            if ( oldEditorSelection.data[sourceIndex] ) { // ignore transparent pixels
              const destinationIndex = ( offsetY + originY ) * destinationWidth + offsetX + originX;
              layerData[destinationIndex] = oldEditorSelection.data[sourceIndex];
            }
          }
        }
      }

      for ( let y = 0; y < newEditorSelection.height; y += 1 ) {
        for ( let x = 0; x < newEditorSelection.width; x += 1 ) {
          const adjustedY = y + newEditorSelection.offsetY + originY;
          const adjustedX = x + newEditorSelection.offsetX + originX;
          const destinationIndex = adjustedY * destinationWidth + adjustedX;
          layerData[destinationIndex] = 0;
        }
      }

      return newState;
    }
    case CREATE_TILESET_EDITOR_SELECTION: {
      const {
        tilesetIndex,
        layerIndex,
        selection,
        editorSelection,
      } = action.payload;

      const {
        selectedTile,
        tileSize,
      } = selection;

      const newState = cloneDeep( state );
      const layerData = newState[tilesetIndex].layers[layerIndex].data;

      const originX = ( selectedTile % newState[tilesetIndex].width ) * tileSize;
      const originY = Math.floor( selectedTile / newState[tilesetIndex].width ) * tileSize;
      const destinationWidth = newState[tilesetIndex].width * tileSize;
      for ( let y = 0; y < editorSelection.height; y += 1 ) {
        for ( let x = 0; x < editorSelection.width; x += 1 ) {
          const adjustedY = y + editorSelection.offsetY + originY;
          const adjustedX = x + editorSelection.offsetX + originX;
          const destinationIndex = adjustedY * destinationWidth + adjustedX;
          layerData[destinationIndex] = 0;
        }
      }

      return newState;
    }
    case APPLY_TILESET_EDITOR_SELECTION: {
      const {
        tilesetIndex,
        layerIndex,
        selection,
        editorSelection,
      } = action.payload;

      const {
        selectedTile,
        tileSize,
        selectionWidth,
        selectionHeight,
      } = selection;

      const newState = cloneDeep( state );
      const layerData = newState[tilesetIndex].layers[layerIndex].data;

      const originX = ( selectedTile % newState[tilesetIndex].width ) * tileSize;
      const originY = Math.floor( selectedTile / newState[tilesetIndex].width ) * tileSize;
      const destinationWidth = newState[tilesetIndex].width * tileSize;

      for ( let y = 0; y < editorSelection.height; y += 1 ) {
        for ( let x = 0; x < editorSelection.width; x += 1 ) {
          const offsetX = x + editorSelection.offsetX;
          const offsetY = y + editorSelection.offsetY;

          if (
            offsetX >= 0
            && offsetX < selectionWidth * tileSize
            && offsetY >= 0
            && offsetY < selectionHeight * tileSize
          ) {
            const sourceIndex = y * editorSelection.width + x;
            if ( editorSelection.data[sourceIndex] ) { // ignore transparent pixels
              const destinationIndex = ( offsetY + originY ) * destinationWidth + offsetX + originX;
              layerData[destinationIndex] = editorSelection.data[sourceIndex];
            }
          }
        }
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

    case SET_TILESET_MAP_SELECTION: {
      const { selection, tilesetIndex } = action.payload;
      const { selectedTile, selectionWidth, selectionHeight } = selection;
      const newState = [...state];
      newState[tilesetIndex] = { ...state[tilesetIndex] };
      newState[tilesetIndex].mapSelectedTile = selectedTile;
      newState[tilesetIndex].mapSelectionWidth = selectionWidth;
      newState[tilesetIndex].mapSelectionHeight = selectionHeight;
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

export function setTilesetMapSelection( selection, tilesetIndex ) {
  return {
    type: SET_TILESET_MAP_SELECTION,
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
