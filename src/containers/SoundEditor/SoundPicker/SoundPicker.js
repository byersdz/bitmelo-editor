
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import NumberPicker from 'Components/NumberPicker/NumberPicker';
import TextInput from 'Components/TextInput/TextInput';
import Button from 'Components/Button/Button';

import { setSoundData, addSound } from 'State/Sound/sounds';
import { selectSound } from 'State/Sound/activeSound';

import './SoundPicker.scss';

class SoundPicker extends React.Component {
  handleIndexChange( newIndex ) {
    const { _selectSound } = this.props;
    _selectSound( newIndex );
  }

  handleNameChange( newValue ) {
    const { _setSoundData, soundData, activeSound } = this.props;
    _setSoundData( activeSound, { ...soundData, name: newValue } );
  }

  handleAddSound() {
    const { _addSound, _selectSound, numberOfSounds } = this.props;
    _addSound();
    _selectSound( numberOfSounds );
  }

  render() {
    const { soundData, activeSound, numberOfSounds } = this.props;

    return (
      <div className="sound-picker">
        <div className="row">
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
        <div className="row">
          <Button
            title="Add Sound"
            click={ () => this.handleAddSound() }
            standard
          />
        </div>
      </div>
    );
  }
}

SoundPicker.propTypes = {
  soundData: PropTypes.shape( { volumeTics: PropTypes.arrayOf( PropTypes.number ) } ).isRequired,
  activeSound: PropTypes.number.isRequired,
  _setSoundData: PropTypes.func.isRequired,
  _selectSound: PropTypes.func.isRequired,
  numberOfSounds: PropTypes.number.isRequired,
  _addSound: PropTypes.func.isRequired,
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
    _setSoundData: setSoundData,
    _selectSound: selectSound,
    _addSound: addSound,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( SoundPicker );
