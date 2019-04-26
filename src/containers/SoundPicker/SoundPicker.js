
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Card from 'Components/Card/Card';
import NumberPicker from 'Components/NumberPicker/NumberPicker';
import { setSoundData } from 'State/Sound/sounds';
import { selectSound } from 'State/Sound/activeSound';

import './SoundPicker.scss';

class SoundPicker extends React.Component {
  handleIndexChange( newIndex ) {
    const { selectActiveSound } = this.props;
    selectActiveSound( newIndex );
  }

  render() {
    const { soundData, activeSound, setSound } = this.props;
    console.log( soundData );
    console.log( activeSound );
    console.log( setSound );

    return (
      <Card className="sound-picker">
        <NumberPicker
          title="Sound Index"
          minValue={ 0 }
          maxValue={ 255 }
          value={ activeSound }
          onValueChange={ newValue => this.handleIndexChange( newValue ) }
        />
      </Card>
    );
  }
}

SoundPicker.propTypes = {
  soundData: PropTypes.shape( { volumeTics: PropTypes.arrayOf( PropTypes.number ) } ).isRequired,
  activeSound: PropTypes.number.isRequired,
  setSound: PropTypes.func.isRequired,
  selectActiveSound: PropTypes.func.isRequired,
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
    selectActiveSound: selectSound,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( SoundPicker );
