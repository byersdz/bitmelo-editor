/* eslint-disable no-param-reassign */
import cloneDeep from 'lodash/cloneDeep';
import { applyTileDrawToData } from '../../../utils/PixelTools/tileDraw';

export const tileDrawToolStart = ( editingData, tileDrawOptions ) => {
  const {
    selectionData,
    selectionWidth,
    selectionHeight,
    button,
  } = tileDrawOptions;

  const selectionDataCopy = cloneDeep( selectionData );

  if ( button === 2 ) {
    // erase if right click
    selectionDataCopy.fill( 0 );
  }

  editingData.selectionData = selectionDataCopy;
  editingData.selectionWidth = selectionWidth;
  editingData.selectionHeight = selectionHeight;

  return applyTileDrawToData( editingData );
};

export const tileDrawToolMove = ( editingData ) => {
  return applyTileDrawToData( editingData );
};
