
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TilemapToolSettings from './TilemapToolSettings/TilemapToolSettings';
import TilemapToolPicker from './TilemapToolPicker/TilemapToolPicker';
import TilemapPixelEditor from './TilemapPixelEditor/TilemapPixelEditor';

import TilemapStatusBar from './TilemapStatusBar/TilemapStatusBar';

import {
  toggleTilemapEditorPanels,
  toggleTilemapSelector,
  toggleTilemapTileSelector,
} from '../../state/Layout/tilemapEditor';

import {
  eventMatchesHotkey,
  TOGGLE_PANELS,
  TOGGLE_PANEL_2,
  TOGGLE_PANEL_4,
} from '../../utils/hotkeys';

import './TilemapEditor.scss';

class TilemapEditor extends React.Component {
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
    const {
      _toggleTilemapEditorPanels,
      _toggleTilemapSelector,
      _toggleTilemapTileSelector,
      anyModalIsOpen,
    } = this.props;

    if ( anyModalIsOpen ) {
      return;
    }

    if ( eventMatchesHotkey( event, TOGGLE_PANELS ) ) {
      _toggleTilemapEditorPanels();
      event.preventDefault();
    }

    if ( eventMatchesHotkey( event, TOGGLE_PANEL_2 ) ) {
      _toggleTilemapSelector();
      event.preventDefault();
    }

    if ( eventMatchesHotkey( event, TOGGLE_PANEL_4 ) ) {
      _toggleTilemapTileSelector();
      event.preventDefault();
    }
  }

  render() {
    return (
      <div className="tilemap-editor">
        <TilemapToolSettings />
        <TilemapToolPicker />
        <div className="editor-section">
          <TilemapPixelEditor />
        </div>
        <TilemapStatusBar />
      </div>
    );
  }
}

TilemapEditor.propTypes = {
  _toggleTilemapEditorPanels: PropTypes.func.isRequired,
  _toggleTilemapSelector: PropTypes.func.isRequired,
  _toggleTilemapTileSelector: PropTypes.func.isRequired,
  anyModalIsOpen: PropTypes.bool.isRequired,
};

function mapStateToProps( state ) {
  return {
    anyModalIsOpen: state.layout.modalCount > 0,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _toggleTilemapEditorPanels: toggleTilemapEditorPanels,
    _toggleTilemapSelector: toggleTilemapSelector,
    _toggleTilemapTileSelector: toggleTilemapTileSelector,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( TilemapEditor );
