
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import TabbedCard from 'Components/TabbedCard/TabbedCard';
import Button from 'Components/Button/Button';

import VolumeTicsEditor from 'Containers/SoundEditor/VolumeTicsEditor/VolumeTicsEditor';
import PitchTicsEditor from 'Containers/SoundEditor/PitchTicsEditor/PitchTicsEditor';
import ArpTicsEditor from 'Containers/SoundEditor/ArpTicsEditor/ArpTicsEditor';
import WavePicker from 'Containers/SoundEditor/WavePicker/WavePicker';
import SoundPicker from 'Containers/SoundEditor/SoundPicker/SoundPicker';
import SoundPiano from 'Containers/SoundEditor/SoundPiano/SoundPiano';
import ReleaseEditor from 'Containers/SoundEditor/ReleaseEditor/ReleaseEditor';

import {
  VOLUME_TAB,
  PITCH_TAB,
  ARP_TAB,
  setSoundTicTab,
} from 'State/Layout/activeSoundTicTab';

import { deleteSound } from 'State/Sound/sounds';
import { selectSound } from 'State/Sound/activeSound';

import './SoundEditor.scss';

class SoundEditor extends React.Component {
  handleTicTabSelect( key ) {
    const { _setSoundTicTab } = this.props;
    _setSoundTicTab( key );
  }

  handleDelete() {
    const {
      _deleteSound,
      _selectSound,
      activeSound,
    } = this.props;

    _deleteSound( activeSound );
    if ( activeSound > 0 ) {
      _selectSound( activeSound - 1 );
    }
  }

  render() {
    const { activeTicTab, numberOfSounds } = this.props;

    const tabs = [
      { key: VOLUME_TAB, title: 'Volume' },
      { key: PITCH_TAB, title: 'Pitch' },
      { key: ARP_TAB, title: 'Arpeggio' },
    ];

    let ticContentRender = null;

    switch ( activeTicTab ) {
      case VOLUME_TAB:
        ticContentRender = <VolumeTicsEditor />;
        break;
      case PITCH_TAB:
        ticContentRender = <PitchTicsEditor />;
        break;
      case ARP_TAB:
        ticContentRender = <ArpTicsEditor />;
        break;

      default:
        ticContentRender = (
          <div>
            Unkown Content
          </div>
        );
        break;
    }

    const deleteButtonRender = numberOfSounds > 1 ? (
      <Button
        title="Delete"
        click={ () => this.handleDelete() }
        standard
      />
    ) : null;

    return (
      <div className="sound-editor">
        <SoundPicker />
        <WavePicker />
        <TabbedCard
          className="tic-editors"
          tabList={ tabs }
          activeTab={ activeTicTab }
          onTabSelect={ key => this.handleTicTabSelect( key ) }
        >
          { ticContentRender }
        </TabbedCard>
        <SoundPiano />
        <ReleaseEditor />
        <div className="buttons">
          { deleteButtonRender }
        </div>
      </div>
    );
  }
}

SoundEditor.propTypes = {
  activeTicTab: PropTypes.string.isRequired,
  _setSoundTicTab: PropTypes.func.isRequired,
  numberOfSounds: PropTypes.number.isRequired,
  _deleteSound: PropTypes.func.isRequired,
  _selectSound: PropTypes.func.isRequired,
  activeSound: PropTypes.number.isRequired,
};

function mapStateToProps( state ) {
  return {
    activeTicTab: state.layout.activeSoundTicTab,
    numberOfSounds: state.sound.sounds.length,
    activeSound: state.sound.activeSound,
    pianoOctave: state.layout.soundEditor.pianoOctave,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setSoundTicTab: setSoundTicTab,
    _deleteSound: deleteSound,
    _selectSound: selectSound,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( SoundEditor );
