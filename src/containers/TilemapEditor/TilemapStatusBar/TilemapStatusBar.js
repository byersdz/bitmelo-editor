
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { startGidForTileset } from '../../../utils/tilesetHelpers';

import './TilemapStatusBar.scss';

class TilemapStatusBar extends React.Component {
  render() {
    const {
      currentTileset,
      cursorX,
      cursorY,
      tilesets,
      activeIndex,
    } = this.props;

    const x = currentTileset.mapSelectedTile % currentTileset.width;
    const y = Math.floor( currentTileset.mapSelectedTile / currentTileset.width );

    const startGID = startGidForTileset( tilesets, activeIndex );

    let selectionText = 'selection{ gid: ';
    selectionText += `${ currentTileset.mapSelectedTile + startGID }, x: `;
    selectionText += `${ x }, y: `;
    selectionText += `${ y }, w: `;
    selectionText += `${ currentTileset.mapSelectionWidth }, h: `;
    selectionText += `${ currentTileset.mapSelectionHeight } }`;

    return (
      <div className="tilemap-status-bar">
        <div className="left">
          {
            `cursor{ x: ${ cursorX }, y: ${ cursorY } }`
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

TilemapStatusBar.propTypes = {
  currentTileset: PropTypes.object.isRequired,
  cursorX: PropTypes.number.isRequired,
  cursorY: PropTypes.number.isRequired,
  tilesets: PropTypes.array.isRequired,
  activeIndex: PropTypes.number.isRequired,
};

function mapStateToProps( state ) {
  const { activeIndex } = state.tileset.present;
  const currentTileset = state.tileset.present.tilesets[activeIndex];
  return {
    currentTileset,
    cursorX: state.layout.tilemapEditor.cursorX,
    cursorY: state.layout.tilemapEditor.cursorY,
    tilesets: state.tileset.present.tilesets,
    activeIndex,
  };
}

export default connect( mapStateToProps )( TilemapStatusBar );
