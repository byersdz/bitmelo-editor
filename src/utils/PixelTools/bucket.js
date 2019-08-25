
function fill( data, x, y, width, height, fillId, targetId ) {
  if ( x < 0 || x >= width || y < 0 || y >= height ) {
    return;
  }

  const id = data[y * width + x];
  if ( id === targetId ) {
    data[y * width + x] = fillId; //eslint-disable-line
    fill( data, x + 1, y, width, height, fillId, targetId );
    fill( data, x - 1, y, width, height, fillId, targetId );
    fill( data, x, y + 1, width, height, fillId, targetId );
    fill( data, x, y - 1, width, height, fillId, targetId );
  }
}


export function applyBucketToData( data, width, height, editingData ) {
  const {
    currentX,
    currentY,
    paletteId,
  } = editingData;

  if ( currentX < 0 || currentX >= width || currentY < 0 || currentY >= height ) {
    return null;
  }

  const newData = [...data];
  const targetId = newData[currentY * width + currentX];

  if ( targetId === paletteId ) {
    return null;
  }

  fill( newData, currentX, currentY, width, height, paletteId, targetId );

  return newData;
}
