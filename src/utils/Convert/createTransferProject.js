import compressProjectState from './compressProjectState';

export default function createTransferProject( projectData ) {
  const compressedState = compressProjectState( projectData );

  const result = {};
  result.sounds = compressedState.sound.sounds;

  result.palette = {};
  result.palette.colors = compressedState.palette.colors;

  result.tilesets = compressedState.tileset.tilesets;

  result.tilemaps = compressedState.tilemap.tilemaps;

  result.project = compressedState.project;

  result.code = {};
  result.code.scripts = compressedState.code.scripts;

  return result;
}
