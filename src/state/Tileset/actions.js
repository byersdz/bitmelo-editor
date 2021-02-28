
import cloneDeep from 'lodash/cloneDeep';

import { getSelectedTileData } from '../../utils/tilesetHelpers';

export const CREATE_TILESET_EDITOR_SELECTION = 'CREATE_TILESET_EDITOR_SELECTION';
export const APPLY_TILESET_EDITOR_SELECTION = 'APPLY_TILESET_EDITOR_SELECTION';
export const REPOSITION_TILESET_EDITOR_SELECTION = 'REPOSITION_TILESET_EDITOR_SELECTION';

export function createTilesetEditorSelection( tilesetIndex, layerIndex, selection, editorSelection ) {
  return {
    type: CREATE_TILESET_EDITOR_SELECTION,
    payload: {
      tilesetIndex,
      layerIndex,
      selection,
      editorSelection,
    },
  };
}

export function applyTilesetEditorSelection( tilesetIndex, layerIndex, selection, editorSelection ) {
  return {
    type: APPLY_TILESET_EDITOR_SELECTION,
    payload: {
      tilesetIndex,
      layerIndex,
      selection,
      editorSelection,
    },
  };
}

export function repositionTilesetEditorSelection(
  tilesetIndex,
  layerIndex,
  selection,
  oldEditorSelection,
  newEditorSelection,
  preserveData = false,
) {
  return {
    type: REPOSITION_TILESET_EDITOR_SELECTION,
    payload: {
      tilesetIndex,
      layerIndex,
      selection,
      oldEditorSelection,
      newEditorSelection,
      preserveData,
    },
  };
}

export function deselectTilesetEditorSelection( tilesetState, tileSize ) {
  const tilesetIndex = tilesetState.activeIndex;
  const tileset = tilesetState.tilesets[tilesetIndex];
  const layerIndex = tileset.activeLayer;

  const selection = {
    tileSize,
    selectedTile: tileset.selectedTile,
    selectionWidth: tileset.selectionWidth,
    selectionHeight: tileset.selectionHeight,
  };

  const editorSelection = cloneDeep( tilesetState.editorSelection );

  return applyTilesetEditorSelection( tilesetIndex, layerIndex, selection, editorSelection );
}

export function selectAllTileset( tilesetState, tileSize ) {
  const tileset = tilesetState.tilesets[tilesetState.activeIndex];
  const selectedData = getSelectedTileData( tileset, tileSize );

  const prevEditorSelection = cloneDeep( tilesetState.editorSelection );

  const selection = {
    tileSize,
    selectedTile: tileset.selectedTile,
    selectionWidth: tileset.selectionWidth,
    selectionHeight: tileset.selectionHeight,
  };

  const editorSelection = {
    width: selectedData.width,
    height: selectedData.height,
    offsetX: 0,
    offsetY: 0,
    data: selectedData.data,
    isActive: true,
  };

  // add the previous editor selection to the new one if it exists
  if ( prevEditorSelection && prevEditorSelection.isActive ) {
    for ( let y = 0; y < prevEditorSelection.height; y += 1 ) {
      for ( let x = 0; x < prevEditorSelection.width; x += 1 ) {
        const targetX = x + prevEditorSelection.offsetX;
        const targetY = y + prevEditorSelection.offsetY;

        if (
          targetX >= 0
          && targetX < editorSelection.width
          && targetY >= 0
          && targetY < editorSelection.height
        ) {
          const sourceIndex = y * prevEditorSelection.width + x;
          const destIndex = targetY * editorSelection.width + targetX;
          editorSelection.data[destIndex] = prevEditorSelection.data[sourceIndex];
        }
      }
    }
  }

  return createTilesetEditorSelection( tilesetState.activeIndex, tileset.activeLayer, selection, editorSelection );
}
