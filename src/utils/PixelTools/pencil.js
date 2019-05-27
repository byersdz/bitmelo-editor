
export function applyPencilToData( data, width, height, editingData ) {
  const { currentX, currentY, paletteId } = editingData;
  const newData = { ...editingData };

  newData.buffer[width * currentY + currentX] = paletteId;
  return newData;
}
