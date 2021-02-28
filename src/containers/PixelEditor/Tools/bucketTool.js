import cloneDeep from 'lodash/cloneDeep';
import { applyBucketToData } from '../../../utils/PixelTools/bucket';

export const bucketToolStart = ( editingData, onEditorSelectionChange, onDataChange ) => {
  const newEditingData = cloneDeep( editingData );
  const newEditorSelection = cloneDeep( newEditingData.editorSelection );

  if ( newEditingData.editorSelection && newEditingData.editorSelection.isActive ) {
    // apply the bucket to the editorSelection
    newEditingData.currentX -= newEditorSelection.offsetX;
    newEditingData.currentY -= newEditorSelection.offsetY;

    const newData = applyBucketToData(
      newEditorSelection.data,
      newEditorSelection.width,
      newEditorSelection.height,
      newEditingData,
    );

    if ( newData ) {
      newEditorSelection.data = newData;
      onEditorSelectionChange( newEditorSelection );
    }
  }
  else {
    const newData = applyBucketToData(
      newEditingData.originalData,
      newEditingData.dataWidth,
      newEditingData.dataHeight,
      editingData,
    );
    if ( newData ) {
      onDataChange( newData );
    }
  }
};
