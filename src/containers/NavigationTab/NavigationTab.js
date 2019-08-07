
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Button from 'Components/Button/Button';
import ButtonTabs from 'Components/ButtonTabs/ButtonTabs';

import {
  selectNavigationTab,
  ABOUT_TAB,
  PROJECT_TAB,
  PLAY_TAB,
  CODE_TAB,
  TILE_TAB,
  TILEMAP_TAB,
  SOUND_TAB,
} from 'State/Layout/activeNavigationTab';
import { toggleNavigationPanel } from 'State/Layout/navigationPanelIsOpen';
import { STOP_ALL_AUDIO, addAudioEvent } from 'State/Sound/audioEvents';

import './NavigationTab.scss';

class NavigationTab extends React.Component {
  constructor( props ) {
    super( props );

    this.handleClick = this.handleClick.bind( this );
  }

  handleClick( key ) {
    const { _selectNavigationTab, _addAudioEvent } = this.props;
    _addAudioEvent( { type: STOP_ALL_AUDIO } );
    _selectNavigationTab( key );
  }

  render() {
    const { activeTab, isOpen, _toggleNavigationPanel } = this.props;

    const buttonList = [
      {
        key: ABOUT_TAB,
        title: 'About',
        icon: 'clipboard',
      },
      {
        key: PROJECT_TAB,
        title: 'Project',
        icon: 'clipboard',
      },
      {
        key: PLAY_TAB,
        title: 'Play',
        icon: 'play',
      },
      {
        key: CODE_TAB,
        title: 'Code',
        icon: 'brackets',
      },
      {
        key: TILE_TAB,
        title: 'Tile Editor',
        icon: 'tiles',
      },
      {
        key: TILEMAP_TAB,
        title: 'Tilemap Editor',
        icon: 'map',
      },
      {
        key: SOUND_TAB,
        title: 'Sound Editor',
        icon: 'wave',
      },
    ];

    const className = isOpen ? 'navigation-tab open' : 'navigation-tab';
    const hideTitles = !isOpen;
    return (
      <div className={ className }>
        <Button
          icon="hamburger"
          title="Toggle Navigation Panel"
          className="toggle-panel"
          click={ () => _toggleNavigationPanel() }
          hideTitle
        />
        <ButtonTabs
          buttonList={ buttonList }
          activeButton={ activeTab }
          click={ this.handleClick }
          hideTitles={ hideTitles }
        />
      </div>
    );
  }
}

NavigationTab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  _selectNavigationTab: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  _toggleNavigationPanel: PropTypes.func.isRequired,
  _addAudioEvent: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    activeTab: state.layout.activeNavigationTab,
    isOpen: state.layout.navigationPanelIsOpen,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _selectNavigationTab: selectNavigationTab,
    _toggleNavigationPanel: toggleNavigationPanel,
    _addAudioEvent: addAudioEvent,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( NavigationTab );
