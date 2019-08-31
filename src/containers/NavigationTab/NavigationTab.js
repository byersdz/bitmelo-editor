
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

import { useExtraSmallWidth } from 'Style/dimensions';

import './NavigationTab.scss';

class NavigationTab extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      windowWidth: 10000,
    };

    this.handleClick = this.handleClick.bind( this );
    this.updateDimensions = this.updateDimensions.bind( this );
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener( 'resize', this.updateDimensions );
  }

  componentWillUnmount() {
    window.removeEventListener( 'resize', this.updateDimensions );
  }

  updateDimensions() {
    this.setState( { windowWidth: window.innerWidth } );
  }

  handleClick( key ) {
    const { _selectNavigationTab, _addAudioEvent } = this.props;
    _addAudioEvent( { type: STOP_ALL_AUDIO } );
    _selectNavigationTab( key );
  }

  render() {
    const { activeTab, isOpen, _toggleNavigationPanel } = this.props;
    const { windowWidth } = this.state;

    const buttonList = [
      {
        key: PLAY_TAB,
        title: 'Play',
        icon: 'play',
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
      {
        key: CODE_TAB,
        title: 'Code',
        icon: 'brackets',
      },
      {
        key: PROJECT_TAB,
        title: 'Project',
        icon: 'clipboard',
      },
      {
        key: ABOUT_TAB,
        title: 'About',
        icon: 'info',
      },
    ];

    const forceSmall = windowWidth <= useExtraSmallWidth;

    const className = isOpen && !forceSmall ? 'navigation-tab open' : 'navigation-tab';
    const hideTitles = !isOpen || forceSmall;

    const hamburgerButtonRender = !forceSmall ? (
      <Button
        icon="hamburger"
        title="Toggle Navigation Panel"
        className="toggle-panel"
        click={ () => _toggleNavigationPanel() }
        hideTitle
      />
    ) : (
      <div className="missing-hamburger" />
    );

    return (
      <div className={ className }>
        { hamburgerButtonRender }
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
