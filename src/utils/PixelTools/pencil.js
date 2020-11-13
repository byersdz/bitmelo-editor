
import { getLinePositions } from './line';
import { drawPixelToBuffer } from './pixel';

export function applyPencilToData( editingData ) {
  const {
    lastX,
    lastY,
    currentX,
    currentY,
    paletteId,
    toolSize,
    dataWidth,
    dataHeight,
  } = editingData;

  const newData = { ...editingData };
  const linePositions = getLinePositions( lastX, lastY, currentX, currentY );

  let shiftedX = 0;
  let shiftedY = 0;
  const xOffset = Math.ceil( toolSize / 2 ) - 1;
  const yOffset = Math.ceil( toolSize / 2 ) - 1;

  for ( let i = 0; i < linePositions.length; i += 1 ) {
    const position = linePositions[i];
    for ( let y = 0; y < toolSize; y += 1 ) {
      for ( let x = 0; x < toolSize; x += 1 ) {
        shiftedX = x + position.x - xOffset;
        shiftedY = y + position.y - yOffset;

        if ( newData.editorSelection && newData.editorSelection.isActive ) {
          // draw in the editorSelection
          shiftedX = shiftedX - newData.editorSelection.offsetX;
          shiftedY = shiftedY - newData.editorSelection.offsetY;

          if (
            shiftedX >= 0
            && shiftedX < newData.editorSelection.width
            && shiftedY >= 0
            && shiftedY < newData.editorSelection.height
          ) {
            drawPixelToBuffer(
              shiftedX,
              shiftedY,
              newData.editorSelection.width,
              newData.editorSelection.height,
              paletteId,
              newData.editorSelectionBuffer,
            );
          }
        }
        else {
          drawPixelToBuffer(
            shiftedX,
            shiftedY,
            dataWidth,
            dataHeight,
            paletteId,
            newData.buffer,
          );
        }
      }
    }
  }

  return newData;
}
