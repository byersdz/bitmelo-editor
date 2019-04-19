
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import NumberPicker from 'Components/NumberPicker/NumberPicker';
import Checkbox from 'Components/Checkbox/Checkbox';
import { setSoundData } from 'State/Sound/sounds';

import './LoopControls.scss';

class LoopControls extends React.Component {
  handleLoopStartChange( newValue ) {
    const { setSound, activeSound, soundData } = this.props;
    setSound( activeSound, { ...soundData, loopStart: newValue } );
  }

  handleLoopEndChange( newValue ) {
    const { setSound, activeSound, soundData } = this.props;
    setSound( activeSound, { ...soundData, loopEnd: newValue } );
  }

  handleUseLoopChange( checked ) {
    const { setSound, activeSound, soundData } = this.props;
    setSound( activeSound, { ...soundData, useLoop: checked } );
  }

  render() {
    const { soundData } = this.props;
    const { useLoop } = soundData;

    const startEndRender = useLoop ? (
      <div className="start-end">
        <NumberPicker
          title="Loop Start"
          value={ soundData.loopStart }
          minValue={ 0 }
          maxValue={ 31 }
          onValueChange={ newValue => {
            this.handleLoopStartChange( newValue );
          } }
        />
        <NumberPicker
          title="Loop End"
          value={ soundData.loopEnd }
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
          checked={ soundData.useLoop }
          onChange={ checked => this.handleUseLoopChange( checked ) }
        />
        { startEndRender }
      </div>
    );
  }
}

LoopControls.propTypes = {
  soundData: PropTypes.shape( {
    loopStart: PropTypes.number,
    loopEnd: PropTypes.number,
    useLoop: PropTypes.bool,
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

export default connect( mapStateToProps, mapDispatchToProps )( LoopControls );
