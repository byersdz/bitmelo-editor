
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Piano from 'Components/Piano/Piano';
import NumberPicker from 'Components/NumberPicker/NumberPicker';
import RangeSlider from 'Components/RangeSlider/RangeSlider';

import { addAudioEvent, PIANO_KEY_DOWN, PIANO_KEY_UP } from 'State/Sound/audioEvents';
import { setSoundEditorPianoOctave } from 'State/Layout/soundEditor';
import { setSoundPianoSpeed, setSoundPianoVolume } from 'State/Sound/piano';

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
    const {
      pianoOctave,
      pianoSpeed,
      _setSoundPianoSpeed,
      pianoVolume,
      _setSoundPianoVolume,
    } = this.props;

    return (
      <div className="sound-piano">
        <div className="piano-controls">
          <NumberPicker
            title="Speed"
            minValue={ -4 }
            maxValue={ 3 }
            value={ pianoSpeed }
            onValueChange={ v => _setSoundPianoSpeed( v ) }
          />
          <RangeSlider
            title="Volume"
            min={ 0 }
            max={ 1 }
            step={ 0.01 }
            value={ pianoVolume }
            onValueChange={ v => _setSoundPianoVolume( v ) }
          />
        </div>
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
  pianoSpeed: PropTypes.number.isRequired,
  _setSoundPianoSpeed: PropTypes.func.isRequired,
  pianoVolume: PropTypes.number.isRequired,
  _setSoundPianoVolume: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    pianoOctave: state.layout.soundEditor.pianoOctave,
    pianoSpeed: state.sound.piano.speed,
    pianoVolume: state.sound.piano.volume,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _addAudioEvent: addAudioEvent,
    _setSoundEditorPianoOctave: setSoundEditorPianoOctave,
    _setSoundPianoSpeed: setSoundPianoSpeed,
    _setSoundPianoVolume: setSoundPianoVolume,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( SoundPiano );
