
export default function convertProjectTilemaps( projectTilemaps ) {
  const tilemaps = [];

  for ( let i = 0; i < projectTilemaps.length; i += 1 ) {
    const tilemap = {};
    tilemap.width = projectTilemaps[i].width;
    tilemap.height = projectTilemaps[i].height;
    tilemap.name = projectTilemaps[i].name;
    tilemap.layers = [];

    for ( let j = 0; j < projectTilemaps[i].layers.length; j += 1 ) {
      tilemap.layers.push( ...[projectTilemaps[i].layers[j].data] );
    }

    tilemaps.push( tilemap );
  }

  return tilemaps;
}
