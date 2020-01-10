
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { importProjectData, clearAllUndoHistory } from '../../state/globalActions';
import { setNavigationPanelIsOpen } from '../../state/Layout/navigationPanelIsOpen';
import { setReferencePanelIsOpen } from '../../state/Layout/referencePanelIsOpen';
import { applyTilesetEditorSelection } from '../../state/Tileset/actions';

import NavigationTab from '../../containers/NavigationTab/NavigationTab';
import MainContainer from '../../containers/MainContainer/MainContainer';
import ReferenceTab from '../../containers/ReferenceTab/ReferenceTab';
import BitmeloAudio from '../../containers/BitmeloAudio/BitmeloAudio';

import { loadStateFromLocalStorage } from '../../utils/Saving/localStorage';
import WelcomeDemo from '../../utils/Demos/WelcomeDemo.json';

import { useExtraSmallWidth } from '../../style/dimensions';

import './App.scss';

class App extends React.Component {
  constructor( props ) {
    super( props );
    this.handleKeyDown = this.handleKeyDown.bind( this );
  }

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
    return (
      <div id="app">
        <NavigationTab />
        <MainContainer />
        <ReferenceTab />
        <BitmeloAudio />
      </div>
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
