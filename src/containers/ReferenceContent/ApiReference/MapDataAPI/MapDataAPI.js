
import React from 'react';

import Property from '../Property/Property';
import Method from '../Method/Method';

import './MapDataAPI.scss';

class MapDataAPI extends React.Component {
  render() {
    return (
      <div className="api-map-data">
        <div className="description">
          {
`
Holds all of the TileMap data.
`
          }
        </div>
        <h2>Properties</h2>
        <Property
          name="mapData.tileMaps"
          type="[bitmelo.TileMap]"
          description={
`
Array of TileMap objects.
`
          }
        />
        <h2>Methods</h2>
        <Method
          name="mapData.addTileMap"
          description={
`
Add a TileMap to the tileMaps array from a data object
`
          }
          params={
            [
              {
                name: 'tileMap',
                type: 'object',
                description: 'The tile map data',
              },
            ]
          }
        />
        <Method
          name="mapData.getTile"
          description={
`
Get the tile GID at a given position.
`
          }
          params={
            [
              {
                name: 'x',
                type: 'number',
                description: 'The x position',
              },
              {
                name: 'y',
                type: 'number',
                description: 'The y position',
              },
              {
                name: 'tileMap',
                type: 'number',
                description: 'The index of the tile map you are checking',
              },
              {
                name: 'layer',
                type: 'number',
                description: 'The index of the layer on the tile map you are checking',
              },
            ]
          }
          example={
`
// get the bottom left tile gid in the first tilemap
mapData.getTile(
  0,  // x
  0,  // y
  0,  // tile map index
  0   // layer index
);
`
          }
        />
        <Method
          name="mapData.setTile"
          description={
`
Set the tile GID at a given position
`
          }
          params={
            [
              {
                name: 'gid',
                type: 'number',
                description: 'The gid of the tile to place',
              },
              {
                name: 'x',
                type: 'number',
                description: 'The x position',
              },
              {
                name: 'y',
                type: 'number',
                description: 'The y position',
              },
              {
                name: 'tileMap',
                type: 'number',
                description: 'The index of the tile map you are checking',
              },
              {
                name: 'layer',
                type: 'number',
                description: 'The index of the layer on the tile map you are checking',
              },
            ]
          }
          example={
`
// set the tile gid at the bottom left to 44
mapData.setTile(
  44, // gid
  0,  // x
  0,  // y
  0,  // tile map index
  0   // layer index
);
`
          }
        />
      </div>
    );
  }
}

export default MapDataAPI;
