
import cloneDeep from 'lodash.clonedeep';

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
) {
  return {
    type: REPOSITION_TILESET_EDITOR_SELECTION,
    payload: {
      tilesetIndex,
      layerIndex,
      selection,
      oldEditorSelection,
      newEditorSelection,
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
