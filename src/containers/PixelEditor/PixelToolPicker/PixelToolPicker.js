
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import cloneDeep from 'lodash.clonedeep';

import ToolPicker from 'Components/ToolPicker/ToolPicker';
import Button from 'Components/Button/Button';

import {
  PENCIL_TOOL,
  ERASER_TOOL,
  BUCKET_TOOL,
  MOVE_TOOL,
  RECT_SELECT_TOOL,
  selectPixelTool,
} from 'State/PixelTools/selectedTool';
import { setTileEditorLayoutSettings } from 'State/Layout/tileEditor';
import { setClipboardPixels } from 'State/Clipboard/pixels';
import { setTilesetEditorSelection } from 'State/Tileset/editorSelection';
import { repositionTilesetEditorSelection } from 'State/Tileset/actions';


import './PixelToolPicker.scss';

class PixelToolPicker extends React.Component {
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
    if ( event.which === 66 ) { // b
      this.handleSelectedToolChange( PENCIL_TOOL );
    }
    else if ( event.which === 69 ) { // e
      this.handleSelectedToolChange( ERASER_TOOL );
    }
    else if ( event.which === 71 ) { // g
      this.handleSelectedToolChange( BUCKET_TOOL );
    }
    else if ( event.which === 86 ) { // v
      this.handleSelectedToolChange( MOVE_TOOL );
    }
    else if ( event.which === 77 ) { // m
      this.handleSelectedToolChange( RECT_SELECT_TOOL );
    }
  }

  handleSelectedToolChange( tool ) {
    const { _selectPixelTool } = this.props;
    _selectPixelTool( tool );
  }

  handleShowGridClick() {
    const { _setTileEditorLayoutSettings, tileLayoutSettings } = this.props;
    _setTileEditorLayoutSettings( { ...tileLayoutSettings, showGrid: !tileLayoutSettings.showGrid } );
  }

  handleCopy() {
    const { tilesetState, _setClipboardPixels } = this.props;

    if ( tilesetState.editorSelection && tilesetState.editorSelection.isActive ) {
      const { editorSelection } = tilesetState;

      const pixels = {
        width: editorSelection.width,
        height: editorSelection.height,
        offsetX: editorSelection.offsetX,
        offsetY: editorSelection.offsetY,
        data: cloneDeep( editorSelection.data ),
        isActive: true,
      };

      _setClipboardPixels( pixels );
    }
    else {
      console.log( 'copy all' );
    }
  }

  handlePaste() {
    const {
      tilesetState,
      clipboard,
      tileSize,
      _setTilesetEditorSelection,
      _repositionTilesetEditorSelection,
    } = this.props;

    if ( !clipboard.pixels.isActive ) {
      return;
    }

    if ( tilesetState.editorSelection && tilesetState.editorSelection.isActive ) {
      // reposition the editorSelection
      const tilesetIndex = tilesetState.activeIndex;
      const tileset = tilesetState.tilesets[tilesetIndex];

      const selection = {
        tileSize,
        selectedTile: tileset.selectedTile,
        selectionWidth: tileset.selectionWidth,
        selectionHeight: tileset.selectionHeight,
      };

      const oldEditorSelection = tilesetState.editorSelection;

      const newEditorSelection = {
        width: clipboard.pixels.width,
        height: clipboard.pixels.height,
        offsetX: clipboard.pixels.offsetX,
        offsetY: clipboard.pixels.offsetY,
        data: cloneDeep( clipboard.pixels.data ),
        isActive: true,
      };

      _repositionTilesetEditorSelection(
        tilesetIndex,
        tileset.activeLayer,
        selection,
        oldEditorSelection,
        newEditorSelection,
      );
    }
    else {
      // set the editorSelection
      const newEditorSelection = {
        width: clipboard.pixels.width,
        height: clipboard.pixels.height,
        offsetX: clipboard.pixels.offsetX,
        offsetY: clipboard.pixels.offsetY,
        data: cloneDeep( clipboard.pixels.data ),
        isActive: true,
      };

      _setTilesetEditorSelection( newEditorSelection );
    }
    console.log( 'paste' );
  }

  render() {
    const { selectedTool, tileLayoutSettings } = this.props;

    const tools = [
      { key: PENCIL_TOOL, title: 'Pencil', icon: 'pencil' },
      { key: ERASER_TOOL, title: 'Eraser', icon: 'eraser' },
      { key: BUCKET_TOOL, title: 'Paint Bucket', icon: 'bucket' },
      { key: MOVE_TOOL, title: 'Move', icon: 'move' },
      { key: RECT_SELECT_TOOL, title: 'Rect Select', icon: 'rect-select' },
    ];

    const showGridClass = tileLayoutSettings.showGrid ? 'active' : '';

    return (
      <ToolPicker
        tools={ tools }
        selectedTool={ selectedTool }
        onSelectedToolChange={ tool => this.handleSelectedToolChange( tool ) }
      >
        <Button
          title="Copy"
          icon="rect-select"
          click={ () => this.handleCopy() }
          hideTitle
        />
        <Button
          title="Paste"
          icon="play"
          click={ () => this.handlePaste() }
          hideTitle
        />
        <Button
          className={ showGridClass }
          title="Show Grid"
          icon="grid"
          click={ () => this.handleShowGridClick() }
          hideTitle
        />
      </ToolPicker>
    );
  }
}

PixelToolPicker.propTypes = {
  selectedTool: PropTypes.string.isRequired,
  _selectPixelTool: PropTypes.func.isRequired,
  tileLayoutSettings: PropTypes.object.isRequired,
  _setTileEditorLayoutSettings: PropTypes.func.isRequired,
  tilesetState: PropTypes.object.isRequired,
  _setClipboardPixels: PropTypes.func.isRequired,
  clipboard: PropTypes.object.isRequired,
  _setTilesetEditorSelection: PropTypes.func.isRequired,
  tileSize: PropTypes.number.isRequired,
  _repositionTilesetEditorSelection: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    selectedTool: state.pixelTools.selectedTool,
    tileLayoutSettings: state.layout.tileEditor,
    tilesetState: state.tileset.present,
    clipboard: state.clipboard,
    tileSize: state.project.tileSize,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _selectPixelTool: selectPixelTool,
    _setTileEditorLayoutSettings: setTileEditorLayoutSettings,
    _setClipboardPixels: setClipboardPixels,
    _setTilesetEditorSelection: setTilesetEditorSelection,
    _repositionTilesetEditorSelection: repositionTilesetEditorSelection,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( PixelToolPicker );
