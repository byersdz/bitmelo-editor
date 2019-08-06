
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import PixelEditor from 'Containers/PixelEditor/PixelEditor';

import { undoTilesets, redoTilesets } from 'State/Tileset';
import { setTilesetLayerData } from 'State/Tileset/tilesets';

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

  render() {
    const {
      palette,
      selectedPaletteIndex,
      altPaletteIndex,
      tileset,
      tileSize,
    } = this.props;

    const { selectedTile, selectionWidth, selectionHeight } = tileset;

    const dataWidth = tileset.width * tileSize;
    // const dataHeight = tileset.height * tileSize;

    const activeLayer = tileset.layers[tileset.activeLayer];
    const { data: layerData } = activeLayer;

    const selectedDataWidth = selectionWidth * tileSize;
    const selectedDataHeight = selectionHeight * tileSize;
    const selectedData = new Array( selectedDataWidth * selectedDataHeight );

    const originX = ( selectedTile % tileset.width ) * tileSize;
    const originY = Math.floor( selectedTile / tileset.width ) * tileSize;

    let count = 0;
    let sourceIndex = 0;
    for ( let y = originY; y < originY + selectedDataHeight; y += 1 ) {
      for ( let x = originX; x < originX + selectedDataWidth; x += 1 ) {
        sourceIndex = y * dataWidth + x;
        selectedData[count] = layerData[sourceIndex];
        count += 1;
      }
    }

    return (
      <PixelEditor
        data={ selectedData }
        dataWidth={ selectedDataWidth }
        dataHeight={ selectedDataHeight }
        palette={ palette }
        selectedPaletteIndex={ selectedPaletteIndex }
        altPaletteIndex={ altPaletteIndex }
        onDataChange={ newData => this.handleDataChange( newData ) }
      >
        <TileSelector />
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
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setTilesetLayerData: setTilesetLayerData,
    _undoTilesets: undoTilesets,
    _redoTilesets: redoTilesets,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( TilePixelEditor );
