
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TilemapToolSettings from './TilemapToolSettings/TilemapToolSettings';
import TilemapToolPicker from './TilemapToolPicker/TilemapToolPicker';
import TilemapPixelEditor from './TilemapPixelEditor/TilemapPixelEditor';

import TilemapStatusBar from './TilemapStatusBar/TilemapStatusBar';

import { toggleTilemapEditorPanels } from '../../state/Layout/tilemapEditor';
import { eventMatchesHotkey, TOGGLE_PANELS } from '../../utils/hotkeys';

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
    const { _toggleTilemapEditorPanels, anyModalIsOpen } = this.props;

    if ( anyModalIsOpen ) {
      return;
    }

    if ( eventMatchesHotkey( event, TOGGLE_PANELS ) ) {
      _toggleTilemapEditorPanels();
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
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( TilemapEditor );
