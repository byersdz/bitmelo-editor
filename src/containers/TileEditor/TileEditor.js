
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PixelToolSettings from '../PixelEditor/PixelToolSettings/PixelToolSettings';
import PixelToolPicker from '../PixelEditor/PixelToolPicker/PixelToolPicker';
import TilePixelEditor from './TilePixelEditor/TilePixelEditor';
import PalettePicker from '../PalettePicker/PalettePicker';
import TileStatusBar from './TileStatusBar/TileStatusBar';

import { toggleTileEditorPanels } from '../../state/Layout/tileEditor';

import { eventMatchesHotkey, TOGGLE_PANELS } from '../../utils/hotkeys';

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
    const { _toggleTileEditorPanels } = this.props;

    if ( eventMatchesHotkey( event, TOGGLE_PANELS ) ) {
      _toggleTileEditorPanels();
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
};

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _toggleTileEditorPanels: toggleTileEditorPanels,
  }, dispatch );
}

export default connect( null, mapDispatchToProps )( TileEditor );
