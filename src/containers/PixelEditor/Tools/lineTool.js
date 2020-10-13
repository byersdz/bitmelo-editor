/* eslint-disable no-param-reassign */
import { applyLineToData } from '../../../utils/PixelTools/line';

export const lineToolStart = ( editingData, pixelToolSettings ) => {
  editingData.toolSize = pixelToolSettings.lineSize;
  return applyLineToData( editingData );
};

export const lineToolMove = ( editingData ) => {
  editingData.buffer.fill( -1 );
  if ( editingData.editorSelection && editingData.editorSelection.isActive ) {
    editingData.editorSelectionBuffer.fill( -1 );
  }
  return applyLineToData( editingData );
};
