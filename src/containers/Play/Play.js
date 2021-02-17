
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import createProjectScript from '../../utils/Convert/createProjectScript';

import { addPlayLog } from '../../state/Code/playLogs';

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
    window.removeEventListener( 'message', this.handleMessage );
  }

  shouldComponentUpdate() {
    return false;
  }

  handleMessage( event ) {
    if ( !event.data.type || !event.data.payload ) {
      return;
    }

    const { _addPlayLog } = this.props;
    _addPlayLog( event.data.type, event.data.payload );
  }

  render() {
    const {
      projectData,
    } = this.props;

    const style = `
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: #000;
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

    const projectScript = createProjectScript( projectData );

    const loggingRender = `
    window.onerror = function( message, file, line ) {
      const actualLine = line - 100;
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
      </script>
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
          allow="gamepad"
          sandbox="allow-scripts"
        />
      </div>
    );
  }
}

Play.propTypes = {
  projectData: PropTypes.object.isRequired,
  _addPlayLog: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    projectData: state,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _addPlayLog: addPlayLog,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( Play );
