import cloneDeep from 'lodash/cloneDeep';

// add a source grid to a destination grid
export function combineGrids( source, destination, preserveTransparency = false ) {
  const result = cloneDeep( destination.data );

  for ( let y = 0; y < source.height; y += 1 ) {
    for ( let x = 0; x < source.width; x += 1 ) {
      const sourceItem = source.data[y * source.width + x];

      // igonre transparent pixels
      if ( preserveTransparency ) {
        if ( sourceItem < 0 ) {
          continue;
        }
      }
      else if ( sourceItem <= 0 ) {
        continue;
      }

      const destX = x + source.offsetX;
      const destY = y + source.offsetY;
      if (
        destX >= 0
        && destX < destination.width
        && destY >= 0
        && destY < destination.height
      ) {
        result[destY * destination.width + destX] = sourceItem;
      }
    }
  }

  return result;
}

export function subGrid( sourceArray, sourceWidth, sourceHeight, x, y, width, height ) {
  const result = new Array( width * height );


  return result;
}
