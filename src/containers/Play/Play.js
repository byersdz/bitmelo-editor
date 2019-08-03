
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import createProjectScript from 'Utils/Convert/createProjectScript';

import { addPlayLog, clearPlayLogs } from 'State/Code/playLogs';

import './Play.scss';

class Play extends React.Component {
  constructor( props ) {
    super( props );
    this.handleMessage = this.handleMessage.bind( this );
  }

  componentDidMount() {
    window.addEventListener( 'message', this.handleMessage );
  }

  componentWillUnmount() {
    const { _clearPlayLogs } = this.props;

    window.removeEventListener( 'message', this.handleMessage );
    _clearPlayLogs();
  }

  handleMessage( event ) {
    const { _addPlayLog } = this.props;
    _addPlayLog( event.data.type, event.data.payload );
  }

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

    const loggingRender = `
    window.onerror = function( message, file, line ) {
      const actualLine = line - 95;
      window.parent.postMessage( { type: 'error', payload: '"' + message + '" on line ' + actualLine }, '*' );
    }
      const console = ( function( oldConsole ) {
        return {
          log: function( text ) {
            oldConsole.log( text );
            window.parent.postMessage( { type: 'log', payload: text }, '*' );
          },
          info: function( text ) {
            oldConsole.info( text );
            window.parent.postMessage( { type: 'info', payload: text }, '*' );
          },
          warn: function( text ) {
            oldConsole.warn( text );
            window.parent.postMessage( { type: 'warn', payload: text }, '*' );
          },
          error: function( text ) {
            window.parent.postMessage( { type: 'error', payload: text }, '*' );
            oldConsole.error( text );
          },
        };
      }( window.console ) );

      window.console = console;
    `;

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
      ${ loggingRender }
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
  _addPlayLog: PropTypes.func.isRequired,
  _clearPlayLogs: PropTypes.func.isRequired,
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

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _addPlayLog: addPlayLog,
    _clearPlayLogs: clearPlayLogs,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( Play );
