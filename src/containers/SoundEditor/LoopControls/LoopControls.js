
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import NumberPicker from 'Components/NumberPicker/NumberPicker';
import Checkbox from 'Components/Checkbox/Checkbox';
import { setSoundData } from 'State/Sound/sounds';

import {
  VOLUME_TAB,
  PITCH_TAB,
  ARP_TAB,
} from 'State/Layout/activeSoundTicTab';

import './LoopControls.scss';

class LoopControls extends React.Component {
  handleLoopStartChange( newValue ) {
    const {
      setSound,
      activeSound,
      soundData,
      activeTicTab,
    } = this.props;

    let loopEnd = 31;

    switch ( activeTicTab ) {
      case VOLUME_TAB: {
        loopEnd = soundData.volumeLoopEnd;
        break;
      }
      case PITCH_TAB: {
        loopEnd = soundData.pitchLoopEnd;
        break;
      }
      case ARP_TAB: {
        loopEnd = soundData.arpLoopEnd;
        break;
      }
      default: break;
    }

    if ( newValue > loopEnd ) {
      loopEnd = newValue;
    }

    const newSound = { ...soundData };

    switch ( activeTicTab ) {
      case VOLUME_TAB: {
        newSound.volumeLoopStart = newValue;
        newSound.volumeLoopEnd = loopEnd;
        break;
      }
      case PITCH_TAB: {
        newSound.pitchLoopStart = newValue;
        newSound.pitchLoopEnd = loopEnd;
        break;
      }
      case ARP_TAB: {
        newSound.arpLoopStart = newValue;
        newSound.arpLoopEnd = loopEnd;
        break;
      }
      default: break;
    }

    setSound( activeSound, newSound );
  }

  handleLoopEndChange( newValue ) {
    const {
      setSound,
      activeSound,
      soundData,
      activeTicTab,
    } = this.props;

    let loopStart = 0;

    switch ( activeTicTab ) {
      case VOLUME_TAB: {
        loopStart = soundData.volumeLoopStart;
        break;
      }
      case PITCH_TAB: {
        loopStart = soundData.pitchLoopStart;
        break;
      }
      case ARP_TAB: {
        loopStart = soundData.arpLoopStart;
        break;
      }
      default: break;
    }

    if ( newValue < loopStart ) {
      loopStart = newValue;
    }

    const newSound = { ...soundData };

    switch ( activeTicTab ) {
      case VOLUME_TAB: {
        newSound.volumeLoopStart = loopStart;
        newSound.volumeLoopEnd = newValue;
        break;
      }
      case PITCH_TAB: {
        newSound.pitchLoopStart = loopStart;
        newSound.pitchLoopEnd = newValue;
        break;
      }
      case ARP_TAB: {
        newSound.arpLoopStart = loopStart;
        newSound.arpLoopEnd = newValue;
        break;
      }
      default: break;
    }

    setSound( activeSound, newSound );
  }

  handleUseLoopChange( checked ) {
    const {
      setSound,
      activeSound,
      soundData,
      activeTicTab,
    } = this.props;

    const newSound = { ...soundData };

    switch ( activeTicTab ) {
      case VOLUME_TAB: {
        newSound.useVolumeLoop = checked;
        break;
      }
      case PITCH_TAB: {
        newSound.usePitchLoop = checked;
        break;
      }
      case ARP_TAB: {
        newSound.useArpLoop = checked;
        break;
      }
      default: break;
    }
    setSound( activeSound, newSound );
  }

  render() {
    const { soundData, activeTicTab } = this.props;

    let useLoop = false;
    let loopStart = 0;
    let loopEnd = 31;

    switch ( activeTicTab ) {
      case VOLUME_TAB: {
        useLoop = soundData.useVolumeLoop;
        loopStart = soundData.volumeLoopStart;
        loopEnd = soundData.volumeLoopEnd;
        break;
      }
      case PITCH_TAB: {
        useLoop = soundData.usePitchLoop;
        loopStart = soundData.pitchLoopStart;
        loopEnd = soundData.pitchLoopEnd;
        break;
      }
      case ARP_TAB: {
        useLoop = soundData.useArpLoop;
        loopStart = soundData.arpLoopStart;
        loopEnd = soundData.arpLoopEnd;
        break;
      }
      default: break;
    }

    const startEndRender = useLoop ? (
      <div className="start-end">
        <NumberPicker
          title="Loop Start"
          value={ loopStart }
          minValue={ 0 }
          maxValue={ 31 }
          onValueChange={ newValue => {
            this.handleLoopStartChange( newValue );
          } }
        />
        <NumberPicker
          title="Loop End"
          value={ loopEnd }
          minValue={ 0 }
          maxValue={ 31 }
          onValueChange={ newValue => {
            this.handleLoopEndChange( newValue );
          } }
        />
      </div>
    ) : null;

    return (
      <div className="loop-controls">
        <Checkbox
          title="Use Looping?"
          checked={ useLoop }
          onChange={ checked => this.handleUseLoopChange( checked ) }
        />
        { startEndRender }
      </div>
    );
  }
}

LoopControls.propTypes = {
  soundData: PropTypes.object.isRequired,
  activeSound: PropTypes.number.isRequired,
  setSound: PropTypes.func.isRequired,
  activeTicTab: PropTypes.string.isRequired,
};

function mapStateToProps( state ) {
  const { sounds, activeSound } = state.sound;
  return {
    soundData: sounds[activeSound],
    activeTicTab: state.layout.activeSoundTicTab,
    activeSound,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    setSound: setSoundData,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( LoopControls );
