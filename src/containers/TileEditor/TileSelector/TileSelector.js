
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import ToggleHeader from 'Components/ToggleHeader/ToggleHeader';

import { toggleTileSelector } from 'State/Layout/tileSelectorIsOpen';
import { setTilesetSelection } from 'State/Tileset/tilesets';

import TileSelectorCanvas from './TileSelectorCanvas/TileSelectorCanvas';

import './TileSelector.scss';

class TileSelector extends React.Component {
  handleSelectionChange( selection ) {
    const { activeIndex, _setTilesetSelection } = this.props;
    _setTilesetSelection( selection, activeIndex );
  }

  render() {
    const {
      isOpen,
      _toggleTileSelector,
      tileset,
      tileSize,
      palette,
    } = this.props;

    const className = isOpen ? 'tile-selector open'
      : 'tile-selector closed';

    const contentClass = isOpen ? 'content' : 'content closed';

    const content = (
      <div className={ contentClass }>
        <TileSelectorCanvas
          width={ tileSize * tileset.width }
          height={ tileSize * tileset.height }
          palette={ palette }
          data={ tileset.layers[0].data }
          selectedTile={ tileset.selectedTile }
          selectionWidth={ tileset.selectionWidth }
          selectionHeight={ tileset.selectionHeight }
          tileSize={ tileSize }
          onSelectionChange={ s => this.handleSelectionChange( s ) }
        />
      </div>
    );

    return (
      <div className={ className }>
        <ToggleHeader
          title="Tiles"
          onToggle={ _toggleTileSelector }
        />
        { content }
      </div>
    );
  }
}

TileSelector.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  _toggleTileSelector: PropTypes.func.isRequired,
  tileset: PropTypes.object.isRequired,
  tileSize: PropTypes.number.isRequired,
  palette: PropTypes.array.isRequired,
  activeIndex: PropTypes.number.isRequired,
  _setTilesetSelection: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  const { tileSize } = state.project;
  const { activeIndex } = state.tileset.present;
  const activeTileset = state.tileset.present.tilesets[activeIndex];

  return {
    isOpen: state.layout.tileSelectorIsOpen,
    palette: state.palette.colors,
    activeIndex,
    tileset: activeTileset,
    tileSize,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _toggleTileSelector: toggleTileSelector,
    _setTilesetSelection: setTilesetSelection,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( TileSelector );
