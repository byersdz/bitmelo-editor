/* eslint-disable no-param-reassign */
import { applyPencilToData } from '../../../utils/PixelTools/pencil';

export const tileEraserToolStart = ( editingData ) => {
  editingData.toolSize = 1;
  editingData.paletteId = 0;

  return applyPencilToData( editingData );
};

export const tileEraserToolMove = ( editingData ) => {
  return applyPencilToData( editingData );
};
