
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import TabbedCard from 'Components/TabbedCard/TabbedCard';
import VolumeTicsEditor from 'Containers/VolumeTicsEditor/VolumeTicsEditor';

import {
  VOLUME_TAB,
  PITCH_TAB,
  ARP_TAB,
  setSoundTicTab,
} from 'State/Layout/activeSoundTicTab';

import './SoundEditor.scss';

class SoundEditor extends React.Component {
  handleTicTabSelect( key ) {
    const { setTicTab } = this.props;
    setTicTab( key );
  }

  render() {
    const { activeTicTab } = this.props;

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
      default:
        ticContentRender = (
          <div>
            Unkown Content
          </div>
        );
        break;
    }

    return (
      <div className="sound-editor">
        <TabbedCard
          tabList={ tabs }
          activeTab={ activeTicTab }
          onTabSelect={ key => this.handleTicTabSelect( key ) }
        >
          { ticContentRender }
        </TabbedCard>
      </div>
    );
  }
}

SoundEditor.propTypes = {
  activeTicTab: PropTypes.string.isRequired,
  setTicTab: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    activeTicTab: state.layout.activeSoundTicTab,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    setTicTab: setSoundTicTab,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( SoundEditor );
