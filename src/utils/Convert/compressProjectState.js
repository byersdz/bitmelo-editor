
import { ConvertData } from 'bitmelo';
import cloneDeep from 'lodash.clonedeep';

export default function compressProjectState( projectData ) {
  const dataClone = cloneDeep( projectData );
  dataClone.tileset = dataClone.tileset.present;
  dataClone.tilemap = dataClone.tilemap.present;

  for ( let i = 0; i < dataClone.tileset.tilesets.length; i += 1 ) {
    const currentTileset = dataClone.tileset.tilesets[i];
    for ( let j = 0; j < currentTileset.layers.length; j += 1 ) {
      const layer = currentTileset.layers[j];
      const runArray = ConvertData.arrayToRun( layer.data );
      const compressedString = ConvertData.arrayToCompressedString( runArray );
      layer.format = 'rc';
      layer.data = compressedString;
    }
  }
  return dataClone;
}
