/* eslint-disable no-param-reassign */
import cloneDeep from 'lodash/cloneDeep';

export const moveToolStart = ( editingData, onCreateEditorSelection ) => {
  const {
    editorSelection,
    originalData,
    dataWidth,
    dataHeight,
  } = editingData;


  let newEditorSelection = null;
  if ( editorSelection && editorSelection.isActive ) {
    // use existing selection
    newEditorSelection = cloneDeep( editorSelection );
  }
  else {
    // make a new selection of the entire area
    const dataCopy = cloneDeep( originalData );
    newEditorSelection = {
      width: dataWidth,
      height: dataHeight,
      offsetX: 0,
      offsetY: 0,
      data: dataCopy,
      isActive: true,
    };
    onCreateEditorSelection( newEditorSelection );
  }

  editingData.startSelectionXOffset = newEditorSelection.offsetX;
  editingData.startSelectionYOffset = newEditorSelection.offsetY;
  editingData.currentSelectionXOffset = newEditorSelection.offsetX;
  editingData.currentSelectionYOffset = newEditorSelection.offsetY;

  return editingData;
};

export const moveToolMove = ( editingData ) => {
  editingData.currentSelectionXOffset = editingData.startSelectionXOffset + (
    editingData.currentX - editingData.startX
  );
  editingData.currentSelectionYOffset = editingData.startSelectionYOffset + (
    editingData.currentY - editingData.startY
  );
  return editingData;
};
