
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import NumberPicker from 'Components/NumberPicker/NumberPicker';
import TextInput from 'Components/TextInput/TextInput';
import { setSoundData } from 'State/Sound/sounds';
import { selectSound } from 'State/Sound/activeSound';

import './SoundPicker.scss';

class SoundPicker extends React.Component {
  handleIndexChange( newIndex ) {
    const { selectActiveSound } = this.props;
    selectActiveSound( newIndex );
  }

  handleNameChange( newValue ) {
    const { setSound, soundData, activeSound } = this.props;
    setSound( activeSound, { ...soundData, name: newValue } );
  }

  render() {
    const { soundData, activeSound, numberOfSounds } = this.props;
    return (
      <div className="sound-picker">
        <NumberPicker
          title="Sound Index"
          minValue={ 0 }
          maxValue={ numberOfSounds - 1 }
          value={ activeSound }
          onValueChange={ newValue => this.handleIndexChange( newValue ) }
        />
        <TextInput
          title="Name"
          value={ soundData.name }
          onValueChange={ v => this.handleNameChange( v ) }
        />
      </div>
    );
  }
}

SoundPicker.propTypes = {
  soundData: PropTypes.shape( { volumeTics: PropTypes.arrayOf( PropTypes.number ) } ).isRequired,
  activeSound: PropTypes.number.isRequired,
  setSound: PropTypes.func.isRequired,
  selectActiveSound: PropTypes.func.isRequired,
  numberOfSounds: PropTypes.number.isRequired,
};

function mapStateToProps( state ) {
  const { sounds, activeSound } = state.sound;

  return {
    numberOfSounds: sounds.length,
    soundData: sounds[activeSound],
    activeSound,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    setSound: setSoundData,
    selectActiveSound: selectSound,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( SoundPicker );
