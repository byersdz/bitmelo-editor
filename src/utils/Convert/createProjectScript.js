
import bitmelo from 'Utils/Bitmelo/bitmelo.min.txt';

import convertProjectTilesets from './convertProjectTilesets';

export default function createProjectScript( tileSize, tilesets, scripts ) {
  const convertedTilesets = convertProjectTilesets( tilesets, tileSize );
  const tilesetsString = JSON.stringify( convertedTilesets );

  let scriptsString = '';

  for ( let i = 0; i < scripts.length; i += 1 ) {
    scriptsString += scripts[i].text;
  }

  return `
${ bitmelo }

const engine = new bitmelo.Engine();
engine.screen.scale = 2;

const tilesets = ${ tilesetsString };
for( let i = 0; i < tilesets.length; i += 1 ) {
  engine.tileData.addTileset( tilesets[i] );
}

${ scriptsString }

engine.begin();
`;
}
