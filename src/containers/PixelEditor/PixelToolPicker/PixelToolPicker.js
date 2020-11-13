
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import cloneDeep from 'lodash.clonedeep';

import ToolPicker from '../../../components/ToolPicker/ToolPicker';
import Button from '../../../components/Button/Button';

import {
  PENCIL_TOOL,
  ERASER_TOOL,
  BUCKET_TOOL,
  MOVE_TOOL,
  RECT_SELECT_TOOL,
  LINE_TOOL,
  selectPixelTool,
} from '../../../state/PixelTools/selectedTool';
import { setTileEditorLayoutSettings } from '../../../state/Layout/tileEditor';
import { setClipboardPixels } from '../../../state/Clipboard/pixels';
import { setTilesetEditorSelection, clearTilesetEditorSelection } from '../../../state/Tileset/editorSelection';
import { repositionTilesetEditorSelection } from '../../../state/Tileset/actions';

import { getSelectedTileData } from '../../../utils/tilesetHelpers';

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
    const { anyModalIsOpen } = this.props;

    if ( anyModalIsOpen ) {
      return;
    }

    if ( event.which === 66 ) { // b
      this.handleSelectedToolChange( PENCIL_TOOL );
    }
    else if ( event.which === 69 ) { // e
      this.handleSelectedToolChange( ERASER_TOOL );
    }
    else if ( event.which === 71 ) { // g
      this.handleSelectedToolChange( BUCKET_TOOL );
    }
    else if ( event.which === 76 ) { // l
      this.handleSelectedToolChange( LINE_TOOL );
    }
    else if ( event.which === 86 ) { // v
      if ( event.ctrlKey ) {
        this.handlePaste();
      }
      else {
        this.handleSelectedToolChange( MOVE_TOOL );
      }
    }
    else if ( event.which === 77 ) { // m
      this.handleSelectedToolChange( RECT_SELECT_TOOL );
    }
    else if ( event.which === 67 ) { // c
      if ( event.ctrlKey ) {
        this.handleCopy();
      }
    }
    else if ( event.which === 88 ) { // x
      if ( event.ctrlKey ) {
        this.handleCut();
      }
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
    const { tilesetState, _setClipboardPixels, tileSize } = this.props;

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
      const tileset = tilesetState.tilesets[tilesetState.activeIndex];
      const allData = getSelectedTileData( tileset, tileSize );

      const pixels = {
        width: allData.width,
        height: allData.height,
        offsetX: 0,
        offsetY: 0,
        data: cloneDeep( allData.data ),
        isActive: true,
      };

      _setClipboardPixels( pixels );
    }
  }

  handleCut() {
    const { tilesetState, _setClipboardPixels, _clearTilesetEditorSelection } = this.props;

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
      _clearTilesetEditorSelection();
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
        true,
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

    // always use move tool after pasting
    this.handleSelectedToolChange( MOVE_TOOL );
  }

  render() {
    const { selectedTool, tileLayoutSettings } = this.props;

    const tools = [
      { key: PENCIL_TOOL, title: 'Pencil', icon: 'pencil' },
      { key: ERASER_TOOL, title: 'Eraser', icon: 'eraser' },
      { key: BUCKET_TOOL, title: 'Paint Bucket', icon: 'bucket' },
      { key: MOVE_TOOL, title: 'Move', icon: 'move' },
      { key: RECT_SELECT_TOOL, title: 'Rect Select', icon: 'rect-select' },
      { key: LINE_TOOL, title: 'Line', icon: 'line' },
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
          icon="copy"
          click={ () => this.handleCopy() }
          hideTitle
        />
        <Button
          title="Cut"
          icon="cut"
          click={ () => this.handleCut() }
          hideTitle
        />
        <Button
          title="Paste"
          icon="paste"
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
  _clearTilesetEditorSelection: PropTypes.func.isRequired,
  anyModalIsOpen: PropTypes.bool.isRequired,
};

function mapStateToProps( state ) {
  return {
    selectedTool: state.pixelTools.selectedTool,
    tileLayoutSettings: state.layout.tileEditor,
    tilesetState: state.tileset.present,
    clipboard: state.clipboard,
    tileSize: state.project.tileSize,
    anyModalIsOpen: state.layout.modalCount > 0,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _selectPixelTool: selectPixelTool,
    _setTileEditorLayoutSettings: setTileEditorLayoutSettings,
    _setClipboardPixels: setClipboardPixels,
    _setTilesetEditorSelection: setTilesetEditorSelection,
    _repositionTilesetEditorSelection: repositionTilesetEditorSelection,
    _clearTilesetEditorSelection: clearTilesetEditorSelection,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( PixelToolPicker );
