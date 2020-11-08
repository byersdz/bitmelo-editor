
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PixelToolSettings from '../PixelEditor/PixelToolSettings/PixelToolSettings';
import PixelToolPicker from '../PixelEditor/PixelToolPicker/PixelToolPicker';
import TilePixelEditor from './TilePixelEditor/TilePixelEditor';
import PalettePicker from '../PalettePicker/PalettePicker';
import TileStatusBar from './TileStatusBar/TileStatusBar';

import { toggleTileEditorPanels, toggleTileEditorTileSelector } from '../../state/Layout/tileEditor';

import { eventMatchesHotkey, TOGGLE_PANELS, TOGGLE_PANEL_4 } from '../../utils/hotkeys';

import './TileEditor.scss';

class TileEditor extends React.Component {
  constructor( props ) {
    super( props );

    this.handleKeyDown = this.handleKeyDown.bind( this );
  }

  componentDidMount() {
    window.addEventListener( 'keydown', this.handleKeyDown );
  }

  componentWillUnmount() {
    window.removeEventListener( 'keydown', this.handleKeyDown );
  }

  handleKeyDown( event ) {
    const { _toggleTileEditorPanels, _toggleTileEditorTileSelector, anyModalIsOpen } = this.props;

    if ( anyModalIsOpen ) {
      return;
    }

    if ( eventMatchesHotkey( event, TOGGLE_PANELS ) ) {
      _toggleTileEditorPanels();
      event.preventDefault();
    }

    if ( eventMatchesHotkey( event, TOGGLE_PANEL_4 ) ) {
      _toggleTileEditorTileSelector();
      event.preventDefault();
    }
  }

  render() {
    return (
      <div className="tile-editor">
        <PixelToolSettings />
        <PixelToolPicker />
        <div className="editor-section">
          <TilePixelEditor />
          <PalettePicker />
        </div>
        <TileStatusBar />
      </div>
    );
  }
}

TileEditor.propTypes = {
  _toggleTileEditorPanels: PropTypes.func.isRequired,
  _toggleTileEditorTileSelector: PropTypes.func.isRequired,
  anyModalIsOpen: PropTypes.bool.isRequired,
};

function mapStateToProps( state ) {
  return {
    anyModalIsOpen: state.layout.modalCount > 0,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _toggleTileEditorPanels: toggleTileEditorPanels,
    _toggleTileEditorTileSelector: toggleTileEditorTileSelector,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( TileEditor );
