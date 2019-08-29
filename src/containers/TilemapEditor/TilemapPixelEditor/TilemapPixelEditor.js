
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PixelEditor from 'Containers/PixelEditor/PixelEditor';
import TileSelector from 'Containers/TileEditor/TileSelector/TileSelector';

import { undoTilemaps, redoTilemaps } from 'State/Tilemap';
import { setTilemapLayerData } from 'State/Tilemap/tilemaps';
import { setTilmapCursorPosition } from 'State/Layout/tilemapEditor';

import TilemapSelector from '../TilemapSelector/TilemapSelector';

import './TilemapPixelEditor.scss';

class TilemapPixelEditor extends React.Component {
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
    const { _undoTilemaps, _redoTilemaps } = this.props;

    if ( event.which === 90 && event.ctrlKey ) { // z
      if ( event.shiftKey ) {
        _redoTilemaps();
      }
      else {
        _undoTilemaps();
      }
    }
    else if ( event.which === 89 && event.ctrlKey ) { // y
      _redoTilemaps();
    }
  }

  handleDataChange( newData ) {
    const {
      _setTilemapLayerData,
      tilemap,
      activeIndex,
    } = this.props;
    _setTilemapLayerData( newData, activeIndex, tilemap.activeLayer );
  }

  handleCursorChange( { x, y } ) {
    const { _setTilmapCursorPosition } = this.props;
    _setTilmapCursorPosition( x, y );
  }

  render() {
    const {
      palette,
      tileSize,
      tilesets,
      tilemap,
      activeTileset,
    } = this.props;

    const layerData = tilemap.layers[tilemap.activeLayer].data;
    const { mapSelectionWidth, mapSelectionHeight, mapSelectedTile } = activeTileset;
    const selectionData = new Array( mapSelectionWidth * mapSelectionHeight );
    for ( let y = 0; y < mapSelectionHeight; y += 1 ) {
      for ( let x = 0; x < mapSelectionWidth; x += 1 ) {
        selectionData[y * mapSelectionWidth + x] = mapSelectedTile + ( y * activeTileset.width ) + x + 1;
      }
    }

    return (
      <PixelEditor
        data={ layerData }
        dataWidth={ tilemap.width }
        dataHeight={ tilemap.height }
        palette={ palette }
        selectedPaletteIndex={ mapSelectedTile + 1 }
        onDataChange={ newData => this.handleDataChange( newData ) }
        isTileEditor
        tileSize={ tileSize }
        tilesets={ tilesets }
        selectionData={ selectionData }
        selectionWidth={ mapSelectionWidth }
        selectionHeight={ mapSelectionHeight }
        onCursorChange={ e => this.handleCursorChange( e ) }
      >
        <TilemapSelector />
        <TileSelector isInMapEditor />
      </PixelEditor>
    );
  }
}

TilemapPixelEditor.propTypes = {
  palette: PropTypes.array.isRequired,
  tileSize: PropTypes.number.isRequired,
  tilesets: PropTypes.array.isRequired,
  activeTileset: PropTypes.object.isRequired,
  tilemap: PropTypes.object.isRequired,
  activeIndex: PropTypes.number.isRequired,
  _setTilemapLayerData: PropTypes.func.isRequired,
  _undoTilemaps: PropTypes.func.isRequired,
  _redoTilemaps: PropTypes.func.isRequired,
  _setTilmapCursorPosition: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  const { activeIndex } = state.tilemap.present;
  const activeTilemap = state.tilemap.present.tilemaps[activeIndex];

  const activeTilesetIndex = state.tileset.present.activeIndex;
  const activeTileset = state.tileset.present.tilesets[activeTilesetIndex];

  return {
    palette: state.palette.colors,
    tileSize: state.project.tileSize,
    tilesets: state.tileset.present.tilesets,
    tilemap: activeTilemap,
    activeIndex,
    activeTileset,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setTilemapLayerData: setTilemapLayerData,
    _undoTilemaps: undoTilemaps,
    _redoTilemaps: redoTilemaps,
    _setTilmapCursorPosition: setTilmapCursorPosition,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( TilemapPixelEditor );
