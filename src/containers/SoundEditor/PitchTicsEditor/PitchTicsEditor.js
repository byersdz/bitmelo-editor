
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import WaveGrid from '../../../components/WaveGrid/WaveGrid';
import NumberPicker from '../../../components/NumberPicker/NumberPicker';
import LoopControls from '../LoopControls/LoopControls';
import { setSoundData } from '../../../state/Sound/sounds';

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
    const { soundData, lastTic } = this.props;
    return (
      <Fragment>
        <WaveGrid
          data={ soundData.pitchTics }
          minValue={ -10 }
          maxValue={ 10 }
          onDataChange={ ( newData ) => this.handleTicDataChange( newData ) }
          showLoop={ soundData.usePitchLoop }
          loopStart={ soundData.pitchLoopStart }
          loopEnd={ soundData.pitchLoopEnd }
          lastTic={ lastTic }
        />
        <LoopControls />
        <NumberPicker
          title="Pitch Scale"
          value={ soundData.pitchScale }
          minValue={ 1 }
          maxValue={ 999 }
          onValueChange={ newValue => {
            this.handlePitchScaleChange( newValue );
          } }
        />
      </Fragment>
    );
  }
}

PitchTicsEditor.propTypes = {
  soundData: PropTypes.object.isRequired,
  activeSound: PropTypes.number.isRequired,
  setSound: PropTypes.func.isRequired,
  lastTic: PropTypes.number.isRequired,
};

function mapStateToProps( state ) {
  const { sounds, activeSound } = state.sound;
  return {
    soundData: sounds[activeSound],
    activeSound,
    lastTic: state.layout.soundEditor.lastPitchTic,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    setSound: setSoundData,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( PitchTicsEditor );
