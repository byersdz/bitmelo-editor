
import { getLinePositions } from './line';
import { drawPixelToBuffer } from './pixel';

export function drawTileDataToBuffer( x, y, width, height, buffer, selectionData, selectionWidth, selectionHeight ) {
  const offsetX = Math.floor( ( selectionWidth - 1 ) * 0.5 );
  const offsetY = Math.floor( ( selectionHeight - 1 ) * 0.5 );

  for ( let tileY = 0; tileY < selectionHeight; tileY += 1 ) {
    for ( let tileX = 0; tileX < selectionWidth; tileX += 1 ) {
      drawPixelToBuffer(
        x + tileX - offsetX,
        y + tileY - offsetY,
        width,
        height,
        selectionData[tileY * selectionWidth + tileX],
        buffer,
      );
    }
  }
}

export function applyTileDrawToData( editingData ) {
  const {
    lastX,
    lastY,
    currentX,
    currentY,
    selectionData,
    selectionWidth,
    selectionHeight,
    dataWidth,
    dataHeight,
  } = editingData;

  const newData = { ...editingData };
  const linePositions = getLinePositions( lastX, lastY, currentX, currentY );
  for ( let i = 0; i < linePositions.length; i += 1 ) {
    const position = linePositions[i];
    drawTileDataToBuffer(
      position.x,
      position.y,
      dataWidth,
      dataHeight,
      newData.buffer,
      selectionData,
      selectionWidth,
      selectionHeight,
    );
  }

  return newData;
}
