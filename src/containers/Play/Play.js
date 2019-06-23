
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import bitmelo from 'Utils/Bitmelo/bitmelo.min.txt';
import convertToTilesetArray from 'Utils/Convert/convertToTilesetArray';

import './Play.scss';

class Play extends React.Component {
  render() {
    const { tilesets, tileSize } = this.props;
    const tileset = tilesets[0];
    const testTileset = {};
    testTileset.data = convertToTilesetArray(
      tileset.layers[0].data,
      tileset.width * tileSize,
      tileset.height * tileSize,
      tileSize,
    );
    testTileset.width = tileset.width;
    testTileset.height = tileset.height;
    testTileset.format = 'array';
    testTileset.name = 'test';
    testTileset.tileSize = tileSize;

    const tilesetString = JSON.stringify( testTileset );

    const style = `
      <style>
        body {
          margin: 0;
          padding: 0;
        }

        #bitmelo-container {
          margin: 0 auto;
          padding: 0;
        }

        #bitmelo-container canvas {
          margin: auto;
          display: block;

        }
      </style>
    `;
    const bitmeloInitialization = `
      const engine = new bitmelo.Engine();
      engine.screen.scale = 2;

      const tileset = ${ tilesetString };
      engine.tileData.addTileset( tileset );
      engine.onInit = () => {
      }
      engine.onUpdate = () => {
        for (let y = 0; y < 8; y += 1) {
          for (let x = 0; x < 8; x += 1) {
            engine.screen.drawTile( y * 8 + x + 1, x * 16, y * 16 );
          }
        }
      }
      engine.begin();
    `;

    const iframeSrc = `
    <html>
    <head>
      ${ style }
    </head>
    <body>
      <div id="bitmelo-container"></div>
      <script>
      ${ bitmelo }
      ${ bitmeloInitialization }
      </script>
    </body>
    </html>
  `;

    return (
      <div className="play">
        <iframe
          className="play-iframe"
          srcDoc={ iframeSrc }
          title="play"
          sandbox="allow-scripts"
        />
      </div>
    );
  }
}

Play.propTypes = {
  tilesets: PropTypes.array.isRequired,
  tileSize: PropTypes.number.isRequired,
};

function mapStateToProps( state ) {
  const { tileSize } = state.project;
  const { tilesets } = state.tileset.present;
  return {
    tilesets,
    tileSize,
  };
}

export default connect( mapStateToProps )( Play );
