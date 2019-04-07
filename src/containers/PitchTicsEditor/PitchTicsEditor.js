
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import WaveGrid from 'Components/WaveGrid/WaveGrid';
import { setSoundData } from 'State/Sound/sounds';

import './PitchTicsEditor.scss';

class PitchTicsEditor extends React.Component {
  handleDataChange( newData ) {
    const { setSound, activeSound, soundData } = this.props;
    setSound( activeSound, { ...soundData, pitchTics: newData } );
  }

  render() {
    const { soundData } = this.props;
    return (
      <div>
        <WaveGrid
          data={ soundData.pitchTics }
          minValue={ -10 }
          maxValue={ 10 }
          onDataChange={ ( newData ) => this.handleDataChange( newData ) }
        />
      </div>
    );
  }
}

PitchTicsEditor.propTypes = {
  soundData: PropTypes.shape( { pitchTics: PropTypes.arrayOf( PropTypes.number ) } ).isRequired,
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
