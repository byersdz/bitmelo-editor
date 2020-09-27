
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Button from '../../components/Button/Button';
import ButtonTabs from '../../components/ButtonTabs/ButtonTabs';

import {
  selectNavigationTab,
  ABOUT_TAB,
  PROJECT_TAB,
  PLAY_TAB,
  CODE_TAB,
  TILE_TAB,
  TILEMAP_TAB,
  SOUND_TAB,
  PUBLISH_TAB,
} from '../../state/Layout/activeNavigationTab';
import { toggleNavigationPanel } from '../../state/Layout/navigationPanelIsOpen';
import { STOP_ALL_AUDIO, addAudioEvent } from '../../state/Sound/audioEvents';

import { useExtraSmallWidth } from '../../style/dimensions';

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
        key: PUBLISH_TAB,
        title: 'Publish',
        icon: 'publish',
      },
      {
        key: ABOUT_TAB,
        title: 'About',
        icon: 'info',
      },
    ];

    const useFloating = windowWidth <= useExtraSmallWidth;

    let className = isOpen ? 'navigation-tab open' : 'navigation-tab';

    if ( useFloating ) {
      className += ' floating';
    }

    const hideTitles = !isOpen;

    const spacerRender = useFloating ? <div className="nav-spacer" /> : null;

    return (
      <Fragment>
        { spacerRender }
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
      </Fragment>
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
