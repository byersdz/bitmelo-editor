
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash.clonedeep';

import PixelEditor from 'Containers/PixelEditor/PixelEditor';

import { undoTilesets, redoTilesets } from 'State/Tileset';
import { setTilesetLayerData } from 'State/Tileset/tilesets';
import {
  createTilesetEditorSelection,
  applyTilesetEditorSelection,
  repositionTilesetEditorSelection,
} from 'State/Tileset/actions';
import { setTilesetEditorSelection, clearTilesetEditorSelection } from 'State/Tileset/editorSelection';
import { selectPaletteIndex } from 'State/Palette/selectedIndex';
import { selectAltPaletteIndex } from 'State/Palette/altIndex';
import { PENCIL_TOOL, BUCKET_TOOL } from 'State/PixelTools/selectedTool';

import { getSelectedTileData } from 'Utils/tilesetHelpers';

import TileSelector from '../TileSelector/TileSelector';

import './TilePixelEditor.scss';

class TilePixelEditor extends React.Component {
  constructor( props ) {
    super( props );

    this.handleKeyDown = this.handleKeyDown.bind( this );
  }

  componentDidMount() {
    window.addEventListener( 'keydown', this.handleKeyDown );
  }

  componentWillUnmount() {
    this.applyAndClearSelection();

    window.removeEventListener( 'keydown', this.handleKeyDown );
  }

  handleKeyDown( event ) {
    const { _undoTilesets, _redoTilesets } = this.props;

    if ( event.which === 90 && event.ctrlKey ) { // z
      if ( event.shiftKey ) {
        _redoTilesets();
      }
      else {
        _undoTilesets();
      }
    }
    else if ( event.which === 89 && event.ctrlKey ) { // y
      _redoTilesets();
    }
  }

  handleDataChange( newData ) {
    const {
      activeIndex,
      _setTilesetLayerData,
      tileset,
      tileSize,
    } = this.props;

    const selection = {
      selectedTile: tileset.selectedTile,
      selectionWidth: tileset.selectionWidth,
      selectionHeight: tileset.selectionHeight,
      tileSize,
    };
    _setTilesetLayerData( newData, activeIndex, tileset.activeLayer, selection );
  }

  handleEyeDropper( { id, alt } ) {
    const {
      _selectPaletteIndex,
      _selectAltPaletteIndex,
      colorPickerIsOpen,
      selectedTool,
    } = this.props;

    if ( colorPickerIsOpen ) {
      return;
    }

    if ( selectedTool === PENCIL_TOOL || selectedTool === BUCKET_TOOL ) {
      if ( alt ) {
        _selectAltPaletteIndex( id );
      }
      else {
        _selectPaletteIndex( id );
      }
    }
  }

  handleCreateEditorSelection( editorSelection ) {
    const {
      activeIndex,
      tileset,
      tileSize,
      _createTilesetEditorSelection,
    } = this.props;

    const selection = {
      selectedTile: tileset.selectedTile,
      selectionWidth: tileset.selectionWidth,
      selectionHeight: tileset.selectionHeight,
      tileSize,
    };

    _createTilesetEditorSelection( activeIndex, tileset.activeLayer, selection, editorSelection );
  }

  handleRepositionEditorSelection( newEditorSelection ) {
    const {
      activeIndex,
      tileset,
      tileSize,
      editorSelection,
      _repositionTilesetEditorSelection,
    } = this.props;

    const selection = {
      selectedTile: tileset.selectedTile,
      selectionWidth: tileset.selectionWidth,
      selectionHeight: tileset.selectionHeight,
      tileSize,
    };

    const combinedSelection = cloneDeep( newEditorSelection );

    for ( let y = 0; y < editorSelection.height; y += 1 ) {
      for ( let x = 0; x < editorSelection.width; x += 1 ) {
        const sourceItem = editorSelection.data[y * editorSelection.width + x];

        const targetX = x + editorSelection.offsetX - newEditorSelection.offsetX;
        const targetY = y + editorSelection.offsetY - newEditorSelection.offsetY;

        if (
          targetX >= 0
          && targetX < newEditorSelection.width
          && targetY >= 0
          && targetY < newEditorSelection.height
        ) {
          const destinationIndex = targetY * newEditorSelection.width + targetX;
          if ( newEditorSelection.data[destinationIndex] === 0 ) {
            combinedSelection.data[destinationIndex] = sourceItem;
          }
        }
      }
    }

    _repositionTilesetEditorSelection(
      activeIndex,
      tileset.activeLayer,
      selection,
      editorSelection,
      combinedSelection,
    );
  }

  applyAndClearSelection() {
    const {
      activeIndex,
      tileset,
      tileSize,
      editorSelection,
      _applyTilesetEditorSelection,
    } = this.props;

    const selection = {
      selectedTile: tileset.selectedTile,
      selectionWidth: tileset.selectionWidth,
      selectionHeight: tileset.selectionHeight,
      tileSize,
    };

    _applyTilesetEditorSelection( activeIndex, tileset.activeLayer, selection, editorSelection );
  }

  dataFromSelectedTiles() {
    const {
      tileset,
      tileSize,
    } = this.props;

    return getSelectedTileData( tileset, tileSize );
  }

  render() {
    const {
      palette,
      selectedPaletteIndex,
      altPaletteIndex,
      tileSize,
      editorSelection,
      _setTilesetEditorSelection,
    } = this.props;

    const selectedData = this.dataFromSelectedTiles();

    return (
      <PixelEditor
        data={ selectedData.data }
        tileSize={ tileSize }
        dataWidth={ selectedData.width }
        dataHeight={ selectedData.height }
        palette={ palette }
        selectedPaletteIndex={ selectedPaletteIndex }
        altPaletteIndex={ altPaletteIndex }
        editorSelection={ editorSelection }
        onEditorSelectionChange={ v => _setTilesetEditorSelection( v ) }
        onDeselect={ () => this.applyAndClearSelection() }
        onDataChange={ newData => this.handleDataChange( newData ) }
        onEyeDropper={ e => this.handleEyeDropper( e ) }
        onCreateEditorSelection={ d => this.handleCreateEditorSelection( d ) }
        onRepositionEditorSelection={ d => this.handleRepositionEditorSelection( d ) }
      >
        <TileSelector
          onSelectionWillChange={ () => this.applyAndClearSelection() }
        />
      </PixelEditor>
    );
  }
}

TilePixelEditor.propTypes = {
  palette: PropTypes.arrayOf( PropTypes.string ).isRequired,
  selectedPaletteIndex: PropTypes.number.isRequired,
  altPaletteIndex: PropTypes.number.isRequired,
  activeIndex: PropTypes.number.isRequired,
  tileset: PropTypes.object.isRequired,
  tileSize: PropTypes.number.isRequired,
  _setTilesetLayerData: PropTypes.func.isRequired,
  _undoTilesets: PropTypes.func.isRequired,
  _redoTilesets: PropTypes.func.isRequired,
  _selectPaletteIndex: PropTypes.func.isRequired,
  _selectAltPaletteIndex: PropTypes.func.isRequired,
  colorPickerIsOpen: PropTypes.bool.isRequired,
  selectedTool: PropTypes.string.isRequired,
  editorSelection: PropTypes.object.isRequired,
  _setTilesetEditorSelection: PropTypes.func.isRequired,
  _createTilesetEditorSelection: PropTypes.func.isRequired,
  _applyTilesetEditorSelection: PropTypes.func.isRequired,
  _repositionTilesetEditorSelection: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  const { tileSize } = state.project;
  const { activeIndex } = state.tileset.present;
  const activeTileset = state.tileset.present.tilesets[activeIndex];
  return {
    palette: state.palette.colors,
    selectedPaletteIndex: state.palette.selectedIndex,
    altPaletteIndex: state.palette.altIndex,
    activeIndex,
    tileset: activeTileset,
    tileSize,
    colorPickerIsOpen: state.layout.colorPickerIsOpen,
    selectedTool: state.pixelTools.selectedTool,
    editorSelection: state.tileset.present.editorSelection,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setTilesetLayerData: setTilesetLayerData,
    _undoTilesets: undoTilesets,
    _redoTilesets: redoTilesets,
    _selectPaletteIndex: selectPaletteIndex,
    _selectAltPaletteIndex: selectAltPaletteIndex,
    _setTilesetEditorSelection: setTilesetEditorSelection,
    _clearTilesetEditorSelection: clearTilesetEditorSelection,
    _createTilesetEditorSelection: createTilesetEditorSelection,
    _applyTilesetEditorSelection: applyTilesetEditorSelection,
    _repositionTilesetEditorSelection: repositionTilesetEditorSelection,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( TilePixelEditor );
