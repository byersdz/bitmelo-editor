
import convertToTilesetArray from './convertToTilesetArray';

export default function convertProjectTilesets( projectTilesets, tileSize ) {
  const tilesets = [];

  for ( let i = 0; i < projectTilesets.length; i += 1 ) {
    const currentProjectTileset = projectTilesets[i];
    const tileset = {};
    tileset.data = convertToTilesetArray(
      currentProjectTileset.layers[0].data,
      currentProjectTileset.width * tileSize,
      currentProjectTileset.height * tileSize,
      tileSize,
    );
    tileset.width = currentProjectTileset.width;
    tileset.height = currentProjectTileset.width;
    tileset.format = 'array';
    tileset.name = 'test';
    tileset.tileSize = tileSize;

    tilesets.push( tileset );
  }
  return tilesets;
}
