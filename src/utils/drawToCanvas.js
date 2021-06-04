
import get from 'lodash/get';

export function drawBackgroundBorder( settings, canvas ) {
  const {
    offsetX,
    offsetY,
    width,
    height,
    canvasWidth,
    canvasHeight,
  } = settings;

  const context = canvas.getContext( '2d' );

  context.fillStyle = '#777777';

  context.fillRect( 0, 0, canvasWidth, offsetY ); // top
  context.fillRect( 0, 0, offsetX, canvasHeight ); // left
  context.fillRect( 0, offsetY + height, canvasWidth, canvasHeight - height - offsetY ); // bottom
  context.fillRect( offsetX + width, 0, canvasWidth - width - offsetX, canvasHeight ); // right

  // draw border lines
  context.fillStyle = '#222222';
  const lineWidth = 4;
  context.fillRect( offsetX - lineWidth, offsetY - lineWidth, width + lineWidth * 2, lineWidth ); // top
  context.fillRect( offsetX - lineWidth, offsetY + height, width + lineWidth, lineWidth ); // bottom
  context.fillRect( offsetX - lineWidth, offsetY - lineWidth, lineWidth, height + lineWidth * 2 ); // left
  context.fillRect( offsetX + width, offsetY - lineWidth, lineWidth, height + lineWidth * 2 ); // right
}

export function drawPixelDataToCanvas( settings, canvas ) {
  const {
    data,
    prevData,
    dataWidth,
    dataHeight,
    scale,
    palette,
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
          context.fillStyle = `#${ palette[paletteIndex] }`;
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
    palette,
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
            context.fillStyle = `#${ palette[paletteIndex] }`;
            context.fillRect( xOrigin, yOrigin, scale, scale );
          }
        }
      }
    }
  }
}

export function drawTileDataToCanvas( settings, canvas ) {
  const {
    data,
    prevData, // eslint-disable-line
    dataWidth,
    dataHeight,
    scale,
    tileSize,
    tilesets,
    canvasWidth,
    canvasHeight,
    tilesetCanvases,
    offsetX,
    offsetY,
    trim,
  } = settings;

  const context = canvas.getContext( '2d' );

  for ( let y = 0; y < dataHeight; y += 1 ) {
    for ( let x = 0; x < dataWidth; x += 1 ) {
      const tileGID = data[y * dataWidth + x];

      // ignore tiles that are the same as the previous data
      if ( prevData ) {
        if ( tileGID === prevData[y * dataWidth + x] ) {
          continue;
        }
      }

      const drawingSize = tileSize * scale;

      // clear the space of the tile
      const flippedY = dataHeight - y - 1;
      const startX = x * drawingSize + offsetX;
      const startY = flippedY * drawingSize + offsetY;

      const finishX = startX + tileSize * scale;
      const finishY = startY + tileSize * scale;

      // ignore tiles that are not visible if trimming
      if ( trim ) {
        if (
          finishX < 0
          || finishY < 0
          || startX > canvasWidth
          || startY > canvasHeight
        ) {
          continue;
        }
      }

      context.clearRect( startX, startY, drawingSize, drawingSize );

      if ( tileGID === 0 ) {
        continue;
      }

      let tileset = null;
      let tilesetIndex = 0;
      let startGID = 1;
      for ( let i = 0; i < tilesets.length; i += 1 ) {
        const currentTileset = tilesets[i];
        const numberOfTiles = currentTileset.width * currentTileset.height;
        if ( tileGID < startGID + numberOfTiles ) {
          // this is the correct tileset
          tileset = currentTileset;
          tilesetIndex = i;
          break;
        }
        startGID += numberOfTiles;
      }

      if ( tileset === null ) {
        console.log( 'GID is too high!' );
        continue;
      }

      const localID = tileGID - startGID;
      const tileX = localID % tileset.width;
      const tileY = tileset.height - Math.floor( localID / tileset.width ) - 1;

      context.drawImage(
        tilesetCanvases[tilesetIndex],
        tileX * drawingSize,
        tileY * drawingSize,
        drawingSize,
        drawingSize,
        startX,
        startY,
        drawingSize,
        drawingSize,
      );
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

export function drawIndicator( settings, canvas ) {
  const {
    offsetX,
    offsetY,
    indicatorX,
    indicatorY,
    indicatorWidth,
    indicatorHeight,
    scale,
    dataHeight,
  } = settings;

  const widthAdjustment = Math.floor( ( indicatorWidth - 1 ) * 0.5 );
  const heightAdjustment = Math.floor( ( indicatorHeight ) * 0.5 );

  const context = canvas.getContext( '2d' );
  const flippedY = dataHeight - indicatorY - heightAdjustment - 1; // data is using bottom left origin
  const xOrigin = ( indicatorX - widthAdjustment ) * scale + offsetX;
  const yOrigin = flippedY * scale + offsetY;

  const xScale = scale * indicatorWidth;
  const yScale = scale * indicatorHeight;

  if ( scale <= 8 ) {
    context.fillStyle = '#00000044';
    context.fillRect( xOrigin, yOrigin, xScale, yScale );
  }
  else {
    const lineWidth = 2;

    context.fillStyle = '#222222';
    context.fillRect( xOrigin, yOrigin, xScale, lineWidth ); // top
    context.fillRect( xOrigin, yOrigin + yScale - lineWidth, xScale, lineWidth ); // bottom
    context.fillRect( xOrigin, yOrigin, lineWidth, yScale ); // left
    context.fillRect( xOrigin + xScale - lineWidth, yOrigin, lineWidth, yScale ); // right

    context.fillStyle = '#eeeeee';
    context.fillRect( xOrigin - lineWidth, yOrigin - lineWidth, xScale + lineWidth + lineWidth, lineWidth ); // top
    context.fillRect( xOrigin - lineWidth, yOrigin + yScale, xScale + lineWidth + lineWidth, lineWidth ); // bottom
    context.fillRect( xOrigin - lineWidth, yOrigin - lineWidth, lineWidth, yScale + lineWidth + lineWidth ); // left
    context.fillRect( xOrigin + xScale, yOrigin - lineWidth, lineWidth, yScale + lineWidth + lineWidth ); // right
  }
}

export function drawTileSelection( settings, canvas ) {
  const {
    selectedTile,
    selectionWidth,
    selectionHeight,
    dataWidth,
    dataHeight,
    scale,
    tileSize,
  } = settings;

  const context = canvas.getContext( '2d' );

  const tileX = selectedTile % dataWidth;
  const tileY = Math.floor( selectedTile / dataWidth );

  const originX = tileX * scale * tileSize;
  const originY = ( dataHeight - tileY - selectionHeight ) * scale * tileSize;
  const width = selectionWidth * tileSize * scale;
  const height = selectionHeight * tileSize * scale;

  const lineWidth = 4;
  context.fillStyle = '#222222';
  context.fillRect( originX, originY, width, lineWidth ); // top
  context.fillRect( originX, originY + height - lineWidth, width, lineWidth ); // bottom
  context.fillRect( originX, originY, lineWidth, height ); // left
  context.fillRect( originX + width - lineWidth, originY, lineWidth, height ); // right

  context.fillStyle = '#eeeeee';
  context.fillRect( originX - lineWidth, originY - lineWidth, width + lineWidth + lineWidth, lineWidth ); // top
  context.fillRect( originX - lineWidth, originY + height, width + lineWidth + lineWidth, lineWidth ); // bottom
  context.fillRect( originX - lineWidth, originY, lineWidth, height ); // left
  context.fillRect( originX + width, originY, lineWidth, height ); // right
}

// draw a grid based on data
export function drawGrid( settings, canvas ) {
  const {
    interval,
    lineWidth,
    style,
    offsetX,
    offsetY,
    scale,
    dataWidth,
    dataHeight,
  } = settings;

  const yInterval = get( settings, 'yInterval', interval );

  const context = canvas.getContext( '2d' );
  context.fillStyle = style;

  for ( let x = 0; x < dataWidth; x += 1 ) {
    if ( x % interval === 0 ) {
      context.fillRect( x * scale + offsetX, offsetY, lineWidth, dataHeight * scale );
    }
  }

  for ( let y = 0; y < dataHeight; y += 1 ) {
    if ( ( dataHeight - y ) % yInterval === 0 ) {
      context.fillRect( offsetX, y * scale + offsetY, dataWidth * scale, lineWidth );
    }
  }
}
