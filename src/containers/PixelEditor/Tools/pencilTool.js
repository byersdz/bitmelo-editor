/* eslint-disable no-param-reassign */
import { applyPencilToData } from '../../../utils/PixelTools/pencil';

export const pencilToolStart = ( editingData, pixelToolSettings ) => {
  editingData.toolSize = pixelToolSettings.pencilSize;

  return applyPencilToData( editingData );
};

export const pencilToolMove = ( editingData ) => {
  return applyPencilToData( editingData );
};
