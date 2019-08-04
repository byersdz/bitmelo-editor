
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { importProjectData } from 'State/globalActions';
import {
  PLAY_TAB,
  TILE_TAB,
  TILEMAP_TAB,
  CODE_TAB,
} from 'State/Layout/activeNavigationTab';

import NavigationTab from 'Containers/NavigationTab/NavigationTab';
import MainContainer from 'Containers/MainContainer/MainContainer';
import ReferenceTab from 'Containers/ReferenceTab/ReferenceTab';
import BitmeloAudio from 'Containers/BitmeloAudio/BitmeloAudio';
import './App.scss';

import { loadStateFromLocalStorage } from 'Utils/Saving/localStorage';

class App extends React.Component {
  constructor( props ) {
    super( props );
    this.handleKeyDown = this.handleKeyDown.bind( this );
  }

  componentDidMount() {
    const { _importProjectData } = this.props;
    const savedState = loadStateFromLocalStorage();
    if ( savedState ) {
      _importProjectData( savedState );
    }

    window.addEventListener( 'keydown', this.handleKeyDown );
  }

  componentWillUnmount() {
    window.removeEventListener( 'keydown', this.handleKeyDown );
  }

  handleKeyDown( event ) {
    if ( event.which === 83 ) { // s
      if ( event.ctrlKey ) {
        // do nothing when the user attempts to save
        // avoids the annoying save website popup
        event.preventDefault();
      }
    }
  }

  render() {
    const { activeNavigationTab } = this.props;

    let showReferenceTab = false;

    switch ( activeNavigationTab ) {
      case PLAY_TAB: {
        showReferenceTab = true;
        break;
      }
      case TILE_TAB: {
        showReferenceTab = true;
        break;
      }
      case TILEMAP_TAB: {
        showReferenceTab = true;
        break;
      }
      case CODE_TAB: {
        showReferenceTab = true;
        break;
      }
      default: break;
    }

    const referenceTabRender = showReferenceTab ? (
      <ReferenceTab />
    ) : null;
    return (
      <div id="app">
        <NavigationTab />
        <MainContainer />
        { referenceTabRender }
        <BitmeloAudio />
      </div>
    );
  }
}

App.propTypes = {
  _importProjectData: PropTypes.func.isRequired,
  activeNavigationTab: PropTypes.string.isRequired,
};

function mapStateToProps( state ) {
  return {
    activeNavigationTab: state.layout.activeNavigationTab,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _importProjectData: importProjectData,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( App );
