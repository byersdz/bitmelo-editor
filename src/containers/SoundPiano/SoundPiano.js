
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Piano from 'Components/Piano/Piano';
import { addAudioEvent, PIANO_KEY_DOWN, PIANO_KEY_UP } from 'State/Sound/audioEvents';

import './SoundPiano.scss';

class SoundPiano extends React.Component {
  constructor( props ) {
    super( props );

    this.handleKeyDown = this.handleKeyDown.bind( this );
    this.handleKeyUp = this.handleKeyUp.bind( this );
  }

  handleKeyDown( key ) {
    const { _addAudioEvent } = this.props;
    _addAudioEvent( {
      type: PIANO_KEY_DOWN,
      payload: key,
    } );
  }

  handleKeyUp( key ) {
    const { _addAudioEvent } = this.props;
    _addAudioEvent( {
      type: PIANO_KEY_UP,
      payload: key,
    } );
  }

  render() {
    return (
      <div className="sound-piano">
        <Piano
          onKeyDown={ this.handleKeyDown }
          onKeyUp={ this.handleKeyUp }
        />
      </div>
    );
  }
}

SoundPiano.propTypes = {
  _addAudioEvent: PropTypes.func.isRequired,
};

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _addAudioEvent: addAudioEvent,
  }, dispatch );
}

export default connect( null, mapDispatchToProps )( SoundPiano );
