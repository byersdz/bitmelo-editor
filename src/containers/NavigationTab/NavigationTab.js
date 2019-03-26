
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

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

import './NavigationTab.scss';

class NavigationTab extends React.Component {
  constructor( props ) {
    super( props );

    this.handleClick = this.handleClick.bind( this );
  }

  handleClick( key ) {
    const { selectNavigationTab: select } = this.props;
    select( key );
  }

  render() {
    const { activeTab } = this.props;

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
    return (
      <div className="navigation-tab">
        <div className="top-buffer" />
        <ButtonTabs
          buttonList={ buttonList }
          activeButton={ activeTab }
          click={ this.handleClick }
          hideTitles
        />
      </div>
    );
  }
}

NavigationTab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  selectNavigationTab: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    activeTab: state.layout.activeNavigationTab,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    selectNavigationTab,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( NavigationTab );
