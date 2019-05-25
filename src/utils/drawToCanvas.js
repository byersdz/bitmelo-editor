
export function drawPixelDataToCanvas( settings, canvas ) {
  const {
    data,
    prevData,
    dataWidth,
    dataHeight,
    scale,
  } = settings;

  const context = canvas.getContext( '2d' );

  for ( let y = 0; y < dataHeight; y += 1 ) {
    for ( let x = 0; x < dataWidth; x += 1 ) {
      const flippedY = dataHeight - y - 1; // data is using bottom left origin
      const paletteIndex = data[flippedY * dataWidth + x];
      let prevIndex = -1;
      if ( prevData ) {
        prevIndex = prevData[flippedY * dataWidth + x];
      }

      if ( paletteIndex !== prevIndex ) {
        // this pixel has changed, so draw it
        const xOrigin = x * scale;
        const yOrigin = y * scale;

        if ( paletteIndex <= 0 ) {
          context.clearRect( xOrigin, yOrigin, scale, scale );
        }
        else {
          context.fillStyle = '#ff0000';
          context.fillRect( xOrigin, yOrigin, scale, scale );
        }
      }
    }
  }
}

export function drawPixelDataToOffsetCanvas( settings, canvas ) {
  const {
    data,
    dataWidth,
    dataHeight,
    scale,
    offsetX,
    offsetY,
    canvasWidth,
    canvasHeight,
  } = settings;

  const context = canvas.getContext( '2d' );

  for ( let y = 0; y < dataHeight; y += 1 ) {
    for ( let x = 0; x < dataWidth; x += 1 ) {
      const flippedY = dataHeight - y - 1; // data is using bottom left origin
      const xOrigin = x * scale + offsetX;
      const yOrigin = y * scale + offsetY;
      const xFinish = xOrigin + scale;
      const yFinish = yOrigin + scale;

      if (
        ( xFinish > 0 && xFinish < canvasWidth )
        || ( xOrigin > 0 && xOrigin < canvasWidth )
      ) {
        if (
          ( yFinish > 0 && yFinish < canvasHeight )
          || ( yOrigin > 0 && yOrigin < canvasHeight )
        ) {
          // this pixel is on the screen
          const paletteIndex = data[flippedY * dataWidth + x];
          if ( paletteIndex > 0 ) {
            context.fillStyle = '#ff0000';
            context.fillRect( xOrigin, yOrigin, scale, scale );
          }
        }
      }
    }
  }
}

export function copyCanvasToCanvas( source, destination, xOffset, yOffset ) {
  const destContext = destination.getContext( '2d' );
  destContext.drawImage( source, xOffset, yOffset );
}

export function clearCanvasBorder(
  canvas,
  canvasWidth,
  canvasHeight,
  xOrigin,
  yOrigin,
  contentWidth,
  contentHeight,
) {
  const context = canvas.getContext( '2d' );
  context.clearRect( 0, 0, xOrigin, canvasHeight ); // left
  context.clearRect( xOrigin + contentWidth, 0, canvasWidth, canvasHeight ); // right
  context.clearRect( 0, 0, canvasWidth, yOrigin ); // top
  context.clearRect( 0, yOrigin + contentHeight, canvasWidth, canvasHeight ); // bottom
}
