
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Piano from 'Components/Piano/Piano';
import { addAudioEvent, PIANO_KEY_DOWN, PIANO_KEY_UP } from 'State/Sound/audioEvents';
import { setSoundEditorPianoOctave } from 'State/Layout/soundEditor';

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

  handleOctaveChange( newOctave ) {
    const { _setSoundEditorPianoOctave } = this.props;

    _setSoundEditorPianoOctave( newOctave );
  }

  render() {
    const { pianoOctave } = this.props;

    return (
      <div className="sound-piano">
        <Piano
          onKeyDown={ this.handleKeyDown }
          onKeyUp={ this.handleKeyUp }
          octave={ pianoOctave }
          onOctaveChange={ o => this.handleOctaveChange( o ) }
        />
      </div>
    );
  }
}

SoundPiano.propTypes = {
  pianoOctave: PropTypes.number.isRequired,
  _addAudioEvent: PropTypes.func.isRequired,
  _setSoundEditorPianoOctave: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    pianoOctave: state.layout.soundEditor.pianoOctave,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _addAudioEvent: addAudioEvent,
    _setSoundEditorPianoOctave: setSoundEditorPianoOctave,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( SoundPiano );
