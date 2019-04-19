
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import WaveGrid from 'Components/WaveGrid/WaveGrid';
import LoopControls from 'Containers/LoopControls/LoopControls';
import { setSoundData } from 'State/Sound/sounds';

import './VolumeTicsEditor.scss';

class VolumeTicsEditor extends React.Component {
  handleDataChange( newData ) {
    const { setSound, activeSound, soundData } = this.props;
    setSound( activeSound, { ...soundData, volumeTics: newData } );
  }

  render() {
    const { soundData } = this.props;
    return (
      <div>
        <WaveGrid
          data={ soundData.volumeTics }
          minValue={ 0 }
          maxValue={ 15 }
          onDataChange={ ( newData ) => this.handleDataChange( newData ) }
        />
        <LoopControls />
      </div>
    );
  }
}

VolumeTicsEditor.propTypes = {
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

export default connect( mapStateToProps, mapDispatchToProps )( VolumeTicsEditor );
