
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ToolSettings from '../../../components/ToolSettings/ToolSettings';
import NumberPicker from '../../../components/NumberPicker/NumberPicker';
import Button from '../../../components/Button/Button';

import { PENCIL_TOOL, ERASER_TOOL } from '../../../state/PixelTools/selectedTool';
import { setPixelToolSettings } from '../../../state/PixelTools/pixelToolSettings';
import { deselectTilesetEditorSelection, selectAllTileset } from '../../../state/Tileset/actions';
import { flipTilesetEditorSelection } from '../../../state/Tileset/editorSelection';

import { SELECT_ALL, eventMatchesHotkey } from '../../../utils/hotkeys';

import './PixelToolSettings.scss';

class PixelToolSettings extends React.Component {
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
    const { _setPixelToolSettings, pixelToolSettings, selectedTool } = this.props;

    let newPencilSize = -1;
    let newEraserSize = -1;

    if ( event.which === 219 ) { // [
      if ( selectedTool === PENCIL_TOOL ) {
        newPencilSize = pixelToolSettings.pencilSize - 1;
      }
      else if ( selectedTool === ERASER_TOOL ) {
        newEraserSize = pixelToolSettings.eraserSize - 1;
      }
    }
    else if ( event.which === 221 ) { // ]
      if ( selectedTool === PENCIL_TOOL ) {
        newPencilSize = pixelToolSettings.pencilSize + 1;
      }
      else if ( selectedTool === ERASER_TOOL ) {
        newEraserSize = pixelToolSettings.eraserSize + 1;
      }
    }

    if ( newPencilSize > 0 && newPencilSize <= 32 ) {
      _setPixelToolSettings( { ...pixelToolSettings, pencilSize: newPencilSize } );
    }
    else if ( newEraserSize > 0 && newEraserSize <= 32 ) {
      _setPixelToolSettings( { ...pixelToolSettings, eraserSize: newEraserSize } );
    }

    if ( eventMatchesHotkey( event, SELECT_ALL ) ) {
      this.handleSelectAll();
      event.preventDefault();
    }
  }

  handlePencilSizeChange( newValue ) {
    const { _setPixelToolSettings, pixelToolSettings } = this.props;
    _setPixelToolSettings( { ...pixelToolSettings, pencilSize: newValue } );
  }

  handleEraserSizeChange( newValue ) {
    const { _setPixelToolSettings, pixelToolSettings } = this.props;
    _setPixelToolSettings( { ...pixelToolSettings, eraserSize: newValue } );
  }

  handleDeselect() {
    const { _deselectTilesetEditorSelection, tilesetState, tileSize } = this.props;
    if ( tilesetState.editorSelection && tilesetState.editorSelection.isActive ) {
      _deselectTilesetEditorSelection( tilesetState, tileSize );
    }
  }

  handleSelectAll() {
    const { tilesetState, tileSize, _selectAllTileset } = this.props;
    _selectAllTileset( tilesetState, tileSize );
  }

  handleFlipHorizontal() {
    const { tilesetState, _flipTilesetEditorSelection } = this.props;
    if ( tilesetState.editorSelection && tilesetState.editorSelection.isActive ) {
      _flipTilesetEditorSelection( true, false );
    }
    else {
      this.handleSelectAll();
      _flipTilesetEditorSelection( true, false );
    }
  }

  handleFlipVertical() {
    const { tilesetState, _flipTilesetEditorSelection } = this.props;
    if ( tilesetState.editorSelection && tilesetState.editorSelection.isActive ) {
      _flipTilesetEditorSelection( false, true );
    }
    else {
      this.handleSelectAll();
      _flipTilesetEditorSelection( false, true );
    }
  }

  getTransformsRender() {
    const { tilesetState } = this.props;

    const transformButtons = (
      <Fragment>
        <Button
          title="Select All"
          icon="play"
          hideTitle
          click={ () => this.handleSelectAll() }
        />
        <Button
          title="Flip Horizontal"
          icon="copy"
          hideTitle
          click={ () => this.handleFlipHorizontal() }
        />
        <Button
          title="Flip Vertical"
          icon="copy"
          hideTitle
          click={ () => this.handleFlipVertical() }
        />
      </Fragment>
    );

    let selectionButtons = null;
    if ( tilesetState.editorSelection && tilesetState.editorSelection.isActive ) {
      selectionButtons = (
        <Fragment>
          <Button
            title="Deselect"
            icon="deselect"
            hideTitle
            click={ () => this.handleDeselect() }
          />
        </Fragment>
      );
    }

    return (
      <div className="transforms">
        { selectionButtons }
        { transformButtons }
      </div>
    );
  }

  render() {
    const { selectedTool, pixelToolSettings } = this.props;

    let toolsRender = null;
    if ( selectedTool === PENCIL_TOOL ) {
      toolsRender = (
        <NumberPicker
          title="Size"
          value={ pixelToolSettings.pencilSize }
          minValue={ 1 }
          maxValue={ 32 }
          onValueChange={ v => this.handlePencilSizeChange( v ) }
        />
      );
    }
    else if ( selectedTool === ERASER_TOOL ) {
      toolsRender = (
        <NumberPicker
          title="Size"
          value={ pixelToolSettings.eraserSize }
          minValue={ 1 }
          maxValue={ 32 }
          onValueChange={ v => this.handleEraserSizeChange( v ) }
        />
      );
    }

    return (
      <ToolSettings>
        <div className="tools">
          { toolsRender }
        </div>
        { this.getTransformsRender() }
      </ToolSettings>
    );
  }
}

PixelToolSettings.propTypes = {
  selectedTool: PropTypes.string.isRequired,
  pixelToolSettings: PropTypes.object.isRequired,
  _setPixelToolSettings: PropTypes.func.isRequired,
  tilesetState: PropTypes.object.isRequired,
  _deselectTilesetEditorSelection: PropTypes.func.isRequired,
  tileSize: PropTypes.number.isRequired,
  _flipTilesetEditorSelection: PropTypes.func.isRequired,
  _selectAllTileset: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    selectedTool: state.pixelTools.selectedTool,
    pixelToolSettings: state.pixelTools.pixelToolSettings,
    tilesetState: state.tileset.present,
    tileSize: state.project.tileSize,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setPixelToolSettings: setPixelToolSettings,
    _deselectTilesetEditorSelection: deselectTilesetEditorSelection,
    _flipTilesetEditorSelection: flipTilesetEditorSelection,
    _selectAllTileset: selectAllTileset,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( PixelToolSettings );
