
import map from 'lodash/map';

export function getSelectedTileData( tileset, tileSize ) {
  const { selectedTile, selectionWidth, selectionHeight } = tileset;
  const dataWidth = tileset.width * tileSize;

  const activeLayer = tileset.layers[tileset.activeLayer];
  const { data: layerData } = activeLayer;

  const selectedDataWidth = selectionWidth * tileSize;
  const selectedDataHeight = selectionHeight * tileSize;
  const selectedData = new Array( selectedDataWidth * selectedDataHeight );

  const originX = ( selectedTile % tileset.width ) * tileSize;
  const originY = Math.floor( selectedTile / tileset.width ) * tileSize;

  let count = 0;
  let sourceIndex = 0;
  for ( let y = originY; y < originY + selectedDataHeight; y += 1 ) {
    for ( let x = originX; x < originX + selectedDataWidth; x += 1 ) {
      sourceIndex = y * dataWidth + x;
      selectedData[count] = layerData[sourceIndex];
      count += 1;
    }
  }

  return { data: selectedData, width: selectedDataWidth, height: selectedDataHeight };
}

export function startGidForTileset( tilesets, tilesetIndex ) {
  let startIndex = 1;

  for ( let i = 0; i < tilesets.length; i += 1 ) {
    if ( i === tilesetIndex ) {
      return startIndex;
    }
    const { width, height } = tilesets[i];
    startIndex += width * height;
  }

  return startIndex;
}

export function getSelectedLocalIds( tileset, useMap = false ) {
  const {
    width,
    // height,
    selectedTile,
    selectionWidth,
    selectionHeight,
    mapSelectedTile,
    mapSelectionWidth,
    mapSelectionHeight,
  } = tileset;

  let mySelectedTile = selectedTile;
  let mySelectionWidth = selectionWidth;
  let mySelectionHeight = selectionHeight;

  if ( useMap ) {
    mySelectedTile = mapSelectedTile;
    mySelectionWidth = mapSelectionWidth;
    mySelectionHeight = mapSelectionHeight;
  }

  const originX = mySelectedTile % width;
  const originY = Math.floor( mySelectedTile / tileset.width );

  const result = [];

  for ( let y = 0; y < mySelectionHeight; y += 1 ) {
    for ( let x = 0; x < mySelectionWidth; x += 1 ) {
      const localX = originX + x;
      const localY = originY + y;
      result.push( localY * width + localX );
    }
  }

  return result;
}

export function getSelectedFlags( tileset, useMap = false ) {
  const localIds = getSelectedLocalIds( tileset, useMap );

  const flags = map( localIds, id => {
    return tileset.flags[id];
  } );

  return flags;
}
