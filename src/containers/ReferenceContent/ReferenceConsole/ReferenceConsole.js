
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Scrollbars from 'Components/Scrollbars/Scrollbars';
import Checkbox from 'Components/Checkbox/Checkbox';

import { setStickConsoleToBottom } from 'State/Layout/play';

import './ReferenceConsole.scss';

class ReferenceConsole extends React.Component {
  renderLogs() {
    const { playLogs } = this.props;
    const logsRender = [];

    for ( let i = 0; i < playLogs.length; i += 1 ) {
      const log = playLogs[i];
      const className = `log ${ log.type }`;
      const logItem = (
        <div
          className={ className }
          key={ i }
        >
          { log.text }
        </div>
      );

      logsRender.push( logItem );
    }

    return logsRender;
  }

  render() {
    const { stickToBottom, _setStickConsoleToBottom } = this.props;

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
        <Checkbox
          title="Stick To Bottom"
          checked={ stickToBottom }
          onChange={ v => _setStickConsoleToBottom( v ) }
        />
      </div>
    );
  }
}

ReferenceConsole.propTypes = {
  playLogs: PropTypes.array.isRequired,
  stickToBottom: PropTypes.bool.isRequired,
  _setStickConsoleToBottom: PropTypes.func.isRequired,
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
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ReferenceConsole );
