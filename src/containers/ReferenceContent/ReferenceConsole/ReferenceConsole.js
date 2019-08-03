
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Scrollbars from 'Components/Scrollbars/Scrollbars';

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
    const logsRender = this.renderLogs();
    return (
      <Scrollbars className="reference-console">
        { logsRender }
      </Scrollbars>
    );
  }
}

ReferenceConsole.propTypes = {
  playLogs: PropTypes.array.isRequired,
};

function mapStateToProps( state ) {
  return {
    playLogs: state.code.playLogs,
  };
}

export default connect( mapStateToProps )( ReferenceConsole );
