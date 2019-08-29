

export default function convertToTilesetArray( sourceArray, width, height, tileSize ) {
  const imageData = new Array( width * height );
  const tileColumns = width / tileSize;

  for ( let i = 0; i < sourceArray.length; i += 1 ) {
    const x = i % width;
    const y = Math.floor( i / width );
    const tileX = Math.floor( x / tileSize );
    const tileY = Math.floor( y / tileSize );

    const iPerTile = tileSize * tileSize;
    const startIndex = tileY * iPerTile * tileColumns + ( tileX * iPerTile ); // the starting index of the current tile

    // relative x and y from the tile origin
    const relativeX = x - ( tileX * tileSize );
    const relativeY = y - ( tileY * tileSize );

    const destinationIndex = startIndex + ( relativeY * tileSize ) + relativeX;
    imageData[destinationIndex] = sourceArray[i];
  }

  return imageData;
}
