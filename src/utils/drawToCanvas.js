
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
    palette,
    tileSize,
    tilesets,
    canvasWidth,
    canvasHeight,
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

      // clear the space of the tile
      const flippedY = dataHeight - y - 1;
      const startX = x * tileSize * scale;
      const startY = flippedY * tileSize * scale;

      context.clearRect( startX, startY, tileSize * scale, tileSize * scale );

      if ( tileGID === 0 ) {
        continue;
      }

      let tileset = null;
      let startGID = 1;
      for ( let i = 0; i < tilesets.length; i += 1 ) {
        const currentTileset = tilesets[i];
        const numberOfTiles = currentTileset.width * currentTileset.height;
        if ( tileGID <= startGID + numberOfTiles ) {
          // this is the correct tileset
          tileset = currentTileset;
          break;
        }
        startGID += numberOfTiles;
      }

      if ( tileset === null ) {
        console.log( 'GID is too high!' );
        continue;
      }

      const localID = tileGID - startGID;
      const xTilePosition = ( localID % tileset.width ) * tileSize;
      const yTilePosition = ( Math.floor( localID / tileset.width ) ) * tileSize;
      const tileData = new Array( tileSize * tileSize );
      let index = 0;
      for ( let tileY = 0; tileY < tileSize; tileY += 1 ) {
        for ( let tileX = 0; tileX < tileSize; tileX += 1 ) {
          const sourceIndex = ( yTilePosition + tileY ) * tileset.width * tileSize + ( xTilePosition + tileX );
          tileData[index] = tileset.layers[0].data[sourceIndex];
          index += 1;
        }
      }


      const drawPixelDataSettings = {
        data: tileData,
        dataWidth: tileSize,
        dataHeight: tileSize,
        scale,
        canvasWidth,
        canvasHeight,
        palette,
        offsetX: startX,
        offsetY: startY,
      };

      drawPixelDataToOffsetCanvas( drawPixelDataSettings, canvas );
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
    scale,
    dataHeight,
  } = settings;

  const context = canvas.getContext( '2d' );
  const flippedY = dataHeight - indicatorY - 1; // data is using bottom left origin
  const xOrigin = indicatorX * scale + offsetX;
  const yOrigin = flippedY * scale + offsetY;

  if ( scale <= 8 ) {
    context.fillStyle = '#00000044';
    context.fillRect( xOrigin, yOrigin, scale, scale );
  }
  else {
    const lineWidth = 2;

    context.fillStyle = '#222222';
    context.fillRect( xOrigin, yOrigin, scale, lineWidth ); // top
    context.fillRect( xOrigin, yOrigin + scale - lineWidth, scale, lineWidth ); // bottom
    context.fillRect( xOrigin, yOrigin, lineWidth, scale ); // left
    context.fillRect( xOrigin + scale - lineWidth, yOrigin, lineWidth, scale ); // right

    context.fillStyle = '#eeeeee';
    context.fillRect( xOrigin - lineWidth, yOrigin - lineWidth, scale + lineWidth + lineWidth, lineWidth ); // top
    context.fillRect( xOrigin - lineWidth, yOrigin + scale, scale + lineWidth + lineWidth, lineWidth ); // bottom
    context.fillRect( xOrigin - lineWidth, yOrigin - lineWidth, lineWidth, scale + lineWidth + lineWidth ); // left
    context.fillRect( xOrigin + scale, yOrigin - lineWidth, lineWidth, scale + lineWidth + lineWidth ); // right
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

  const context = canvas.getContext( '2d' );
  context.fillStyle = style;

  for ( let x = 0; x < dataWidth; x += 1 ) {
    if ( x % interval === 0 ) {
      context.fillRect( x * scale + offsetX, offsetY, lineWidth, dataHeight * scale );
    }
  }

  for ( let y = 0; y < dataHeight; y += 1 ) {
    if ( y % interval === 0 ) {
      context.fillRect( offsetX, y * scale + offsetY, dataWidth * scale, lineWidth );
    }
  }
}
