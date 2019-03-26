
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Button from 'Components/Button/Button';
import ButtonTabs from 'Components/ButtonTabs/ButtonTabs';
import {
  selectNavigationTab,
  PLAY_TAB,
  CODE_TAB,
  TILE_TAB,
  TILEMAP_TAB,
  SPRITE_TAB,
  SOUND_TAB,
  MUSIC_TAB,
} from 'State/Layout/activeNavigationTab';
import { toggleNavigationPanel } from 'State/Layout/navigationPanelIsOpen';

import './NavigationTab.scss';

class NavigationTab extends React.Component {
  constructor( props ) {
    super( props );

    this.handleClick = this.handleClick.bind( this );
  }

  handleClick( key ) {
    const { selectTab } = this.props;
    selectTab( key );
  }

  render() {
    const { activeTab, isOpen, toggle } = this.props;

    const buttonList = [
      {
        key: PLAY_TAB,
        title: 'Play',
        icon: 'play',
      },
      {
        key: CODE_TAB,
        title: 'Code',
        icon: 'play',
      },
      {
        key: TILE_TAB,
        title: 'Create Tiles',
        icon: 'play',
      },
      {
        key: TILEMAP_TAB,
        title: 'Create Tile Maps',
        icon: 'play',
      },
      {
        key: SPRITE_TAB,
        title: 'Create Sprites',
        icon: 'play',
      },
      {
        key: SOUND_TAB,
        title: 'Create Sounds',
        icon: 'wave',
      },
      {
        key: MUSIC_TAB,
        title: 'Create Music',
        icon: 'play',
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
          click={ () => toggle() }
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
  selectTab: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    activeTab: state.layout.activeNavigationTab,
    isOpen: state.layout.navigationPanelIsOpen,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    selectTab: selectNavigationTab,
    toggle: toggleNavigationPanel,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( NavigationTab );
