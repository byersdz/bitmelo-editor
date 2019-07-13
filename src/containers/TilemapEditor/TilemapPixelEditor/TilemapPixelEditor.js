
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PixelEditor from 'Containers/PixelEditor/PixelEditor';

import './TilemapPixelEditor.scss';

class TilemapPixelEditor extends React.Component {
  handleDataChange( newData ) {
    console.log( newData );
  }

  render() {
    const { palette, tileSize, tilesets } = this.props;

    const tempWidth = 100;
    const tempHeight = 100;
    const tempData = new Array( tempWidth * tempHeight );
    for ( let i = 0; i < tempData.length; i += 1 ) {
      tempData[i] = ( i % 16 ) + 1;
    }

    console.log( tileSize );

    return (
      <PixelEditor
        data={ tempData }
        dataWidth={ tempWidth }
        dataHeight={ tempHeight }
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
};

function mapStateToProps( state ) {
  return {
    palette: state.palette.colors,
    tileSize: state.project.tileSize,
    tilesets: state.tileset.present.tilesets,
  };
}

export default connect( mapStateToProps )( TilemapPixelEditor );
