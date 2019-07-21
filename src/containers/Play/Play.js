
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import createProjectScript from 'Utils/Convert/createProjectScript';

import './Play.scss';

class Play extends React.Component {
  render() {
    const {
      tilesets,
      project,
      scripts,
      palette,
      sounds,
      tilemaps,
    } = this.props;

    const style = `
      <style>
        body {
          margin: 0;
          padding: 0;
        }

        #bitmelo-container {
          margin: 0 auto;
          margin-top: 16px;
          padding: 0;
        }

        #bitmelo-container canvas {
          margin: auto;
          display: block;

        }
      </style>
    `;

    const projectScript = createProjectScript(
      project,
      palette,
      tilesets,
      scripts,
      sounds,
      tilemaps,
    );

    const iframeSrc = `
    <html>
    <head>
      ${ style }
    </head>
    <body>
      <div id="main-container">
        <div id="bitmelo-container"></div>
      </div>
      <script>
      ${ projectScript }
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
  project: PropTypes.object.isRequired,
  scripts: PropTypes.array.isRequired,
  palette: PropTypes.array.isRequired,
  sounds: PropTypes.array.isRequired,
  tilemaps: PropTypes.array.isRequired,
};

function mapStateToProps( state ) {
  const { project } = state;
  const { tilesets } = state.tileset.present;
  const { scripts } = state.code;
  const { sounds } = state.sound;
  const { tilemaps } = state.tilemap.present;
  return {
    tilesets,
    project,
    scripts,
    palette: state.palette.colors,
    sounds,
    tilemaps,
  };
}

export default connect( mapStateToProps )( Play );
