
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Sound } from 'bitmelo';

import NumberPicker from '../../../components/NumberPicker/NumberPicker';
import Select from '../../../components/Select/Select';

import { setSoundData } from '../../../state/Sound/sounds';

import './ReleaseEditor.scss';

class ReleaseEditor extends React.Component {
  handleReleaseLengthChange( newValue ) {
    const { _setSoundData, soundData, activeSound } = this.props;
    _setSoundData( activeSound, { ...soundData, releaseLength: newValue } );
  }

  handleReleaseTypeChange( newValue ) {
    const { _setSoundData, soundData, activeSound } = this.props;
    _setSoundData( activeSound, { ...soundData, releaseMode: newValue } );
  }

  render() {
    const { soundData } = this.props;

    const releaseModeItems = [
      { value: Sound.RELEASE_LINEAR, display: 'Linear' },
      { value: Sound.RELEASE_EXPO, display: 'Exponential' },
    ];

    return (
      <div className="release-editor">
        <NumberPicker
          title="Release Length"
          minValue={ 1 }
          maxValue={ 255 }
          value={ soundData.releaseLength }
          onValueChange={ newValue => this.handleReleaseLengthChange( newValue ) }
        />
        <Select
          title="Release Mode"
          items={ releaseModeItems }
          value={ soundData.releaseMode }
          onValueChange={ newValue => this.handleReleaseTypeChange( newValue ) }
        />
      </div>
    );
  }
}

ReleaseEditor.propTypes = {
  soundData: PropTypes.shape( { volumeTics: PropTypes.arrayOf( PropTypes.number ) } ).isRequired,
  activeSound: PropTypes.number.isRequired,
  _setSoundData: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  const { sounds, activeSound } = state.sound;
  return {
    soundData: sounds[activeSound],
    activeSound,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setSoundData: setSoundData,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ReleaseEditor );
