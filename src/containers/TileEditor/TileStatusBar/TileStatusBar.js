
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { startGidForTileset } from '../../../utils/tilesetHelpers';

import './TileStatusBar.scss';

class TileStatusBar extends React.Component {
  render() {
    const {
      currentTileset,
      paletteId,
      altPaletteId,
      tilesets,
      activeIndex,
    } = this.props;

    const x = currentTileset.selectedTile % currentTileset.width;
    const y = Math.floor( currentTileset.selectedTile / currentTileset.width );

    const startGID = startGidForTileset( tilesets, activeIndex );

    let selectionText = 'tile{ gid: ';
    selectionText += `${ currentTileset.selectedTile + startGID }, x: `;
    selectionText += `${ x }, y: `;
    selectionText += `${ y }, w: `;
    selectionText += `${ currentTileset.selectionWidth }, h: `;
    selectionText += `${ currentTileset.selectionHeight } }`;

    return (
      <div className="tile-status-bar">
        <div className="left">
          {
            `paletteId: ${ paletteId }, alt paletteId: ${ altPaletteId }`
          }
        </div>
        <div className="center">
          {
            ''
          }
        </div>
        <div className="right">
          { selectionText }
        </div>
      </div>
    );
  }
}

TileStatusBar.propTypes = {
  currentTileset: PropTypes.object.isRequired,
  paletteId: PropTypes.number.isRequired,
  altPaletteId: PropTypes.number.isRequired,
  tilesets: PropTypes.array.isRequired,
  activeIndex: PropTypes.number.isRequired,
};

function mapStateToProps( state ) {
  const { activeIndex } = state.tileset.present;
  const currentTileset = state.tileset.present.tilesets[activeIndex];
  return {
    currentTileset,
    paletteId: state.palette.selectedIndex,
    altPaletteId: state.palette.altIndex,
    tilesets: state.tileset.present.tilesets,
    activeIndex,
  };
}

export default connect( mapStateToProps )( TileStatusBar );
