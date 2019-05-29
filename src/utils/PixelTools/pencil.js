
import { getLinePositions } from './line';

export function drawPixelToBuffer( x, y, width, height, paletteId, buffer ) {
  if ( x < 0 || x >= width || y < 0 || y >= height ) {
    return;
  }
  buffer[width * y + x] = paletteId; // eslint-disable-line
}

export function applyPencilToData( data, width, height, editingData ) {
  const {
    lastX,
    lastY,
    currentX,
    currentY,
    paletteId,
  } = editingData;

  const newData = { ...editingData };
  const linePositions = getLinePositions( lastX, lastY, currentX, currentY );
  for ( let i = 0; i < linePositions.length; i += 1 ) {
    const position = linePositions[i];
    drawPixelToBuffer(
      position.x,
      position.y,
      width,
      height,
      paletteId, newData.buffer,
    );
  }
  // newData.buffer[width * currentY + currentX] = paletteId;
  return newData;
}
