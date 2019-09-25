
export function drawEditorSelection( settings, editorSelection, canvas, step ) {
  const {
    offsetX,
    offsetY,
    scale,
    dataHeight,
  } = settings;

  const {
    offsetX: selectionOffsetX,
    offsetY: selectionOffsetY,
    width,
    height,
  } = editorSelection;

  const context = canvas.getContext( '2d' );

  context.lineWidth = 2;

  const flippedY = dataHeight - selectionOffsetY; // data is using bottom left origin
  const xOrigin = selectionOffsetX * scale + offsetX;
  const yOrigin = flippedY * scale + offsetY;

  context.strokeStyle = '#111';
  context.setLineDash( [] );
  context.strokeRect( xOrigin, yOrigin, width * scale, -height * scale );

  context.strokeStyle = '#fff';
  context.setLineDash( [8, 8] );
  context.lineDashOffset = -2 * step;
  context.strokeRect( xOrigin, yOrigin, width * scale, -height * scale );
}
