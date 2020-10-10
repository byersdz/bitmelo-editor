/* eslint-disable no-param-reassign */
import { applyPencilToData } from '../../../utils/PixelTools/pencil';

export const eraserToolStart = ( editingData, pixelToolSettings ) => {
  editingData.toolSize = pixelToolSettings.eraserSize;
  editingData.paletteId = 0;

  return applyPencilToData( editingData );
};

export const eraserToolMove = ( editingData ) => {
  return applyPencilToData( editingData );
};
