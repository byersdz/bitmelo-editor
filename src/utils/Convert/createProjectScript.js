
import bitmelo from 'Utils/Bitmelo/bitmelo.0.3.8.min.txt';

import convertProjectTilesets from './convertProjectTilesets';

export default function createProjectScript( project, palette, tilesets, scripts, sounds ) {
  const convertedTilesets = convertProjectTilesets( tilesets, project.tileSize );
  const tilesetsString = JSON.stringify( convertedTilesets );

  let scriptsString = '';

  for ( let i = 0; i < scripts.length; i += 1 ) {
    scriptsString += scripts[i].text;
  }

  const paletteString = JSON.stringify( palette );

  const soundsString = JSON.stringify( sounds );

  return `
${ bitmelo }

const engine = new bitmelo.Engine();

engine.clickToBegin = ${ project.misc.clickToBegin };
engine.startTransitionFrames = ${ project.misc.startTransitionFrames };

engine.screen.width = ${ project.screen.width };
engine.screen.height = ${ project.screen.height };

engine.screen.scaleMode = ${ project.screen.scaleMode };
engine.screen.scale = ${ project.screen.scale };
engine.screen.minScale = ${ project.screen.minScale };
engine.screen.maxScale = ${ project.screen.maxScale };
engine.screen.horizontalScaleCushion = ${ project.screen.horizontalScaleCushion };
engine.screen.verticalScaleCushion = ${ project.screen.verticalScaleCushion };
engine.screen.rescaleOnWindowResize = ${ project.screen.rescaleOnWindowResize };

engine.screen.hideCursor = ${ project.misc.hideCursor };

engine.screen.setPalette(${ paletteString });

const tilesets = ${ tilesetsString };
for( let i = 0; i < tilesets.length; i += 1 ) {
  engine.tileData.addTileset( tilesets[i] );
}

const sounds = ${ soundsString };
for( let i = 0; i < sounds.length; i += 1 ) {
  engine.audio.addSound( sounds[i] );
}

${ scriptsString }

engine.begin();
`;
}