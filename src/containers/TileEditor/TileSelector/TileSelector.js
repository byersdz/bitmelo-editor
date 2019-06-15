
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import ToggleHeader from 'Components/ToggleHeader/ToggleHeader';

import { toggleTileSelector } from 'State/Layout/tileSelectorIsOpen';

import TileSelectorCanvas from './TileSelectorCanvas/TileSelectorCanvas';

import './TileSelector.scss';

class TileSelector extends React.Component {
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
          scale={ 2 }
          palette={ palette }
          data={ tileset.layers[0].data }
        />
      </div>
    );

    console.log( className );
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
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( TileSelector );
