
import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { importProjectData, clearAllUndoHistory } from '../../state/globalActions';
import { setNavigationPanelIsOpen } from '../../state/Layout/navigationPanelIsOpen';
import { setReferencePanelIsOpen } from '../../state/Layout/referencePanelIsOpen';
import { applyTilesetEditorSelection } from '../../state/Tileset/actions';

import { loadStateFromLocalStorage } from '../../utils/Saving/localStorage';
import WelcomeDemo from '../../utils/Demos/WelcomeDemo.json';

import { useExtraSmallWidth } from '../../style/dimensions';

import EditorPage from '../../pages/EditorPage/EditorPage';

import './App.scss';

class App extends React.Component {
  componentDidMount() {
    const {
      _importProjectData,
      _setNavigationPanelIsOpen,
      _setReferencePanelIsOpen,
      _clearAllUndoHistory,
      _applyTilesetEditorSelection,
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
    return (
      <>
        <EditorPage />
      </>
    );
  }
}

App.propTypes = {
  _importProjectData: PropTypes.func.isRequired,
  _setNavigationPanelIsOpen: PropTypes.func.isRequired,
  _setReferencePanelIsOpen: PropTypes.func.isRequired,
  _clearAllUndoHistory: PropTypes.func.isRequired,
  _applyTilesetEditorSelection: PropTypes.func.isRequired,
};

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _importProjectData: importProjectData,
    _setNavigationPanelIsOpen: setNavigationPanelIsOpen,
    _setReferencePanelIsOpen: setReferencePanelIsOpen,
    _clearAllUndoHistory: clearAllUndoHistory,
    _applyTilesetEditorSelection: applyTilesetEditorSelection,
  }, dispatch );
}

export default connect( null, mapDispatchToProps )( App );
