
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import WaveGrid from 'Components/WaveGrid/WaveGrid';
import NumberPicker from 'Components/NumberPicker/NumberPicker';
import LoopControls from 'Containers/LoopControls/LoopControls';
import { setSoundData } from 'State/Sound/sounds';

import './PitchTicsEditor.scss';

class PitchTicsEditor extends React.Component {
  handleTicDataChange( newData ) {
    const { setSound, activeSound, soundData } = this.props;
    setSound( activeSound, { ...soundData, pitchTics: newData } );
  }

  handlePitchScaleChange( newScale ) {
    const { setSound, activeSound, soundData } = this.props;
    setSound( activeSound, { ...soundData, pitchScale: newScale } );
  }

  render() {
    const { soundData } = this.props;
    return (
      <div>
        <WaveGrid
          data={ soundData.pitchTics }
          minValue={ -10 }
          maxValue={ 10 }
          onDataChange={ ( newData ) => this.handleTicDataChange( newData ) }
        />
        <LoopControls />
        <NumberPicker
          title="Pitch Scale"
          value={ soundData.pitchScale }
          minValue={ 1 }
          maxValue={ 100 }
          onValueChange={ newValue => {
            this.handlePitchScaleChange( newValue );
          } }
        />
      </div>
    );
  }
}

PitchTicsEditor.propTypes = {
  soundData: PropTypes.shape( {
    pitchTics: PropTypes.arrayOf( PropTypes.number ),
    pitchScale: PropTypes.number,
  } ).isRequired,
  activeSound: PropTypes.number.isRequired,
  setSound: PropTypes.func.isRequired,
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
    setSound: setSoundData,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( PitchTicsEditor );
