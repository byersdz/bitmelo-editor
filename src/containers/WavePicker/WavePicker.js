
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Card from 'Components/Card/Card';
import Select from 'Components/Select/Select';
import { setSoundData } from 'State/Sound/sounds';

import './WavePicker.scss';

class WavePicker extends React.Component {
  handleWaveTypeChange( event ) {
    const { setSound, activeSound, soundData } = this.props;
    const waveValue = Number.parseInt( event.target.value, 10 );
    setSound( activeSound, { ...soundData, wave: waveValue } );
  }

  render() {
    const { soundData } = this.props;
    const waveTypeItems = [
      { value: '0', display: 'Sine' },
      { value: '1', display: 'Triangle' },
      { value: '2', display: 'Square' },
      { value: '3', display: 'Sawtooth' },
    ];

    return (
      <Card className="wave-picker">
        <Select
          title="Wave Type"
          items={ waveTypeItems }
          value={ soundData.wave.toString() }
          onValueChange={ event => this.handleWaveTypeChange( event ) }
        />
      </Card>
    );
  }
}

WavePicker.propTypes = {
  soundData: PropTypes.shape( { volumeTics: PropTypes.arrayOf( PropTypes.number ) } ).isRequired,
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

export default connect( mapStateToProps, mapDispatchToProps )( WavePicker );
