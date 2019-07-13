
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

    const tempData = new Array( 15 * 15 );
    for ( let i = 0; i < tempData.length; i += 1 ) {
      tempData[i] = ( i % 16 ) + 1;
    }

    console.log( tileSize );

    return (
      <PixelEditor
        data={ tempData }
        dataWidth={ 15 }
        dataHeight={ 15 }
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
