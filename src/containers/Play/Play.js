
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import createProjectScript from 'Utils/Convert/createProjectScript';

import './Play.scss';

class Play extends React.Component {
  render() {
    const { tilesets, tileSize, scripts } = this.props;

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

    const projectScript = createProjectScript( tileSize, tilesets, scripts );

    const iframeSrc = `
    <html>
    <head>
      ${ style }
    </head>
    <body>
      <div id="bitmelo-container"></div>
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
  tileSize: PropTypes.number.isRequired,
  scripts: PropTypes.array.isRequired,
};

function mapStateToProps( state ) {
  const { tileSize } = state.project;
  const { tilesets } = state.tileset.present;
  const { scripts } = state.code;
  return {
    tilesets,
    tileSize,
    scripts,
  };
}

export default connect( mapStateToProps )( Play );
