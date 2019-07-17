
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PixelEditor from 'Containers/PixelEditor/PixelEditor';

import { undoTilemaps, redoTilemaps } from 'State/Tilemap';
import { setTilemapLayerData } from 'State/Tilemap/tilemaps';

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

  render() {
    const {
      palette,
      tileSize,
      tilesets,
      tilemap,
    } = this.props;

    const layerData = tilemap.layers[tilemap.activeLayer].data;

    return (
      <PixelEditor
        data={ layerData }
        dataWidth={ tilemap.width }
        dataHeight={ tilemap.height }
        palette={ palette }
        selectedPaletteIndex={ 3 }
        onDataChange={ newData => this.handleDataChange( newData ) }
        isTileEditor
        tileSize={ tileSize }
        tilesets={ tilesets }
      />
    );
  }
}

TilemapPixelEditor.propTypes = {
  palette: PropTypes.array.isRequired,
  tileSize: PropTypes.number.isRequired,
  tilesets: PropTypes.array.isRequired,
  tilemap: PropTypes.object.isRequired,
  activeIndex: PropTypes.number.isRequired,
  _setTilemapLayerData: PropTypes.func.isRequired,
  _undoTilemaps: PropTypes.func.isRequired,
  _redoTilemaps: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  const { activeIndex } = state.tilemap.present;
  const activeTilemap = state.tilemap.present.tilemaps[activeIndex];
  return {
    palette: state.palette.colors,
    tileSize: state.project.tileSize,
    tilesets: state.tileset.present.tilesets,
    tilemap: activeTilemap,
    activeIndex,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setTilemapLayerData: setTilemapLayerData,
    _undoTilemaps: undoTilemaps,
    _redoTilemaps: redoTilemaps,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( TilemapPixelEditor );
