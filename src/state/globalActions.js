import { hexToRgb } from '../utils/hexConvert';

export const RESET_PROJECT = 'RESET_PROJECT';

export function resetProject() {
  return {
    type: RESET_PROJECT,
  };
}

export const IMPORT_PROJECT_DATA = 'IMPORT_PROJECT_DATA';

export function importProjectData( data ) {
  return {
    type: IMPORT_PROJECT_DATA,
    payload: data,
  };
}

export const CLEAR_ALL_UNDO_HISTORY = 'CLEAR_ALL_UNDO_HISTORY';

export function clearAllUndoHistory() {
  return {
    type: CLEAR_ALL_UNDO_HISTORY,
  };
}

export const INSERT_PALETTE_COLOR = 'INSERT_PALETTE_COLOR';

export function insertPaletteColor( color, index ) {
  return {
    type: INSERT_PALETTE_COLOR,
    payload: {
      color,
      index,
    },
  };
}

export const REPLACE_PALETTE = 'REPLACE_PALETTE';

export function replacePalette( newColors, existingPalette ) {
  const colors = ['000000', ...newColors];
  const colorMap = {};

  colorMap['0'] = 0;

  for ( let i = 1; i < existingPalette.length; i += 1 ) {
    const currentColor = hexToRgb( existingPalette[i] );
    let smallestDifference = 10000;
    let closestIndex = 1;
    for ( let j = 1; j < colors.length; j += 1 ) {
      const testColor = hexToRgb( colors[j] );
      let currentDifference = Math.abs( currentColor.r - testColor.r );
      currentDifference += Math.abs( currentColor.g - testColor.g );
      currentDifference += Math.abs( currentColor.b - testColor.b );

      if ( currentDifference < smallestDifference ) {
        closestIndex = j;
        smallestDifference = currentDifference;
      }
    }
    colorMap[`${ i }`] = closestIndex;
  }

  return {
    type: REPLACE_PALETTE,
    payload: {
      colors,
      colorMap,
    },
  };
}
