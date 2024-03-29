
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import get from 'lodash/get';

import { importProjectData, clearAllUndoHistory } from '../../state/globalActions';
import { setNavigationPanelIsOpen } from '../../state/Layout/navigationPanelIsOpen';
import { setReferencePanelIsOpen } from '../../state/Layout/referencePanelIsOpen';
import { applyTilesetEditorSelection } from '../../state/Tileset/actions';
import { PROJECTS_PAGE } from '../../state/Layout/activePage';
// import { checkLoginStatus } from '../../state/User/currentUser';

import { loadStateFromLocalStorage } from '../../utils/Saving/localStorage';
import WelcomeDemo from '../../utils/Demos/WelcomeDemo.json';

import { useExtraSmallWidth } from '../../style/dimensions';

import EditorPage from '../../pages/EditorPage/EditorPage';
import ProjectsPage from '../../pages/ProjectsPage/ProjectsPage';

import './App.scss';

class App extends React.Component {
  componentDidMount() {
    const {
      _importProjectData,
      _setNavigationPanelIsOpen,
      _setReferencePanelIsOpen,
      _clearAllUndoHistory,
      _applyTilesetEditorSelection,
      // _checkLoginStatus,
      // _selectActivePage,
    } = this.props;
    const savedState = loadStateFromLocalStorage();
    if ( savedState ) {
      // apply the editorSelection if it exists
      // this can happen if the user reloads or exits the page with an active editorSelection
      if ( savedState.tileset.editorSelection && savedState.tileset.editorSelection.isActive ) {
        const { activeIndex } = savedState.tileset;
        const tileset = savedState.tileset.tilesets[activeIndex];
        const layerIndex = tileset.activeLayer;

        const selection = {
          selectedTile: tileset.selectedTile,
          tileSize: savedState.project.tileSize,
          selectionWidth: tileset.selectionWidth,
          selectionHeight: tileset.selectionHeight,
        };

        _importProjectData( savedState );
        _applyTilesetEditorSelection( activeIndex, layerIndex, selection, savedState.tileset.editorSelection );
      }
      else {
        _importProjectData( savedState );
      }

      /* Removing the project page because of the removal of cloud services
      const userIsLoggedIn = get( savedState, 'user.currentUser.isLoggedIn' );
      // If user is logged in at start check if login is still valid.
      // If not log out the user.
      if ( userIsLoggedIn ) {
        _selectActivePage( PROJECTS_PAGE );
        _checkLoginStatus();
      }
      */

      _clearAllUndoHistory();
    }
    else {
      _importProjectData( WelcomeDemo );
      _clearAllUndoHistory();
    }

    // default to closed panels on a small screen
    if ( window.innerWidth <= useExtraSmallWidth ) {
      _setNavigationPanelIsOpen( false );
      _setReferencePanelIsOpen( false );
    }
  }

  render() {
    const { activePage } = this.props;

    let mainRender = <EditorPage />;

    if ( activePage === PROJECTS_PAGE ) {
      mainRender = <ProjectsPage />;
    }

    return mainRender;
  }
}

App.propTypes = {
  _importProjectData: PropTypes.func.isRequired,
  _setNavigationPanelIsOpen: PropTypes.func.isRequired,
  _setReferencePanelIsOpen: PropTypes.func.isRequired,
  _clearAllUndoHistory: PropTypes.func.isRequired,
  _applyTilesetEditorSelection: PropTypes.func.isRequired,
  // _checkLoginStatus: PropTypes.func.isRequired,
  // _selectActivePage: PropTypes.func.isRequired,
  activePage: PropTypes.string.isRequired,
};

function mapStateToProps( state ) {
  return {
    activePage: state.layout.activePage,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _importProjectData: importProjectData,
    _setNavigationPanelIsOpen: setNavigationPanelIsOpen,
    _setReferencePanelIsOpen: setReferencePanelIsOpen,
    _clearAllUndoHistory: clearAllUndoHistory,
    _applyTilesetEditorSelection: applyTilesetEditorSelection,
    // _checkLoginStatus: checkLoginStatus,
    // _selectActivePage: selectActivePage,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( App );
