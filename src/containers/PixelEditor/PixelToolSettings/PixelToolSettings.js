
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ToolSettings from 'Components/ToolSettings/ToolSettings';
import NumberPicker from 'Components/NumberPicker/NumberPicker';
import Button from 'Components/Button/Button';

import { PENCIL_TOOL, ERASER_TOOL } from 'State/PixelTools/selectedTool';
import { setPixelToolSettings } from 'State/PixelTools/pixelToolSettings';
import { deselectTilesetEditorSelection } from 'State/Tileset/actions';


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

  getTransformsRender() {
    const { tilesetState } = this.props;

    let selectionButtons = null;
    if ( tilesetState.editorSelection && tilesetState.editorSelection.isActive ) {
      selectionButtons = (
        <Fragment>
          <Button
            title="Deselect"
            icon="rect-select"
            hideTitle
            click={ () => this.handleDeselect() }
          />
        </Fragment>
      );
    }

    return (
      <div className="transforms">
        { selectionButtons }
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
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( PixelToolSettings );
