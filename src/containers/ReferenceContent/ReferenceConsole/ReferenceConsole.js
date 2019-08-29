
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Scrollbars from 'Components/Scrollbars/Scrollbars';
import Checkbox from 'Components/Checkbox/Checkbox';
import Button from 'Components/Button/Button';

import { setStickConsoleToBottom } from 'State/Layout/play';
import { setReferenceTabTitle } from 'State/Layout/referenceTabTitle';
import { clearPlayLogs } from 'State/Code/playLogs';

import './ReferenceConsole.scss';

class ReferenceConsole extends React.Component {
  componentDidMount() {
    const { _setReferenceTabTitle } = this.props;
    _setReferenceTabTitle( 'Console' );
  }

  renderLogs() {
    const { playLogs } = this.props;
    const logsRender = [];

    for ( let i = 0; i < playLogs.length; i += 1 ) {
      const log = playLogs[i];
      const className = `log ${ log.type }`;
      const logText = typeof log.text === 'string' ? log.text : JSON.stringify( log.text, null, 2 );
      const logItem = (
        <div
          className={ className }
          key={ i }
        >
          <pre>
            { logText }
          </pre>
        </div>
      );

      logsRender.push( logItem );
    }

    return logsRender;
  }

  render() {
    const { stickToBottom, _setStickConsoleToBottom, _clearPlayLogs } = this.props;

    const logsRender = this.renderLogs();
    return (
      <div className="reference-console">
        <div className="scroll-container">
          <Scrollbars
            stickToBottom={ stickToBottom }
          >
            { logsRender }
          </Scrollbars>
        </div>
        <div className="console-controls">
          <Button
            title="Clear Console"
            standard
            click={ () => _clearPlayLogs() }
          />
          <Checkbox
            title="Stick To Bottom"
            checked={ stickToBottom }
            onChange={ v => _setStickConsoleToBottom( v ) }
          />
        </div>
      </div>
    );
  }
}

ReferenceConsole.propTypes = {
  playLogs: PropTypes.array.isRequired,
  stickToBottom: PropTypes.bool.isRequired,
  _setStickConsoleToBottom: PropTypes.func.isRequired,
  _setReferenceTabTitle: PropTypes.func.isRequired,
  _clearPlayLogs: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    playLogs: state.code.playLogs,
    stickToBottom: state.layout.play.stickConsoleToBottom,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setStickConsoleToBottom: setStickConsoleToBottom,
    _setReferenceTabTitle: setReferenceTabTitle,
    _clearPlayLogs: clearPlayLogs,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ReferenceConsole );
