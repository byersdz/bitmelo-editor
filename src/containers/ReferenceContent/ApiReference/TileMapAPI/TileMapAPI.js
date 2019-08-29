
import React from 'react';

import Property from '../Property/Property';
import Method from '../Method/Method';

import './TileMapAPI.scss';

class TileMapAPI extends React.Component {
  render() {
    return (
      <div className="api-tile-map">
        <div className="description">
          {
`
Represents a Tile Map.
`
          }
        </div>
        <h2>Properties</h2>
        <Property
          name="tileMap.height"
          type="number"
          description={
`
The number of rows in the TileMap.
`
          }
        />
        <Property
          name="tileMap.layers"
          type="[Uint16Array]"
          description={
`
Array of layer data.
`
          }
        />
        <Property
          name="tileMap.name"
          type="string"
          description={
`
The name of the TileMap.
`
          }
        />
        <Property
          name="tileMap.width"
          type="number"
          description={
`
The number of columns in the TileMap.
`
          }
        />
        <h2>Methods</h2>
        <Method
          name="tileMap.getTile"
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
                name: 'layer',
                type: 'number',
                description: 'The layer index',
              },
            ]
          }
          example={
`
const bottomLeftTile = tileMap.getTile(
  0,  // x
  0,  // y
  0   // layer
);
`
          }
        />
        <Method
          name="tileMap.setTile"
          description={
`
Set the tile GID at a given position.
`
          }
          params={
            [
              {
                name: 'gid',
                type: 'number',
                description: 'The gid to place',
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
                name: 'layer',
                type: 'number',
                description: 'The layer index',
              },
            ]
          }
          example={
`
const playerGid = 100;

tileMap.setTile(
  playerGid,  // gid
  0,          // x
  0,          // y
  0           // layer
);
`
          }
        />
      </div>
    );
  }
}

export default TileMapAPI;
