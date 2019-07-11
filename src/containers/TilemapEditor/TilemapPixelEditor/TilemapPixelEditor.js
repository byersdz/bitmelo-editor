
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
    const { palette, tileSize } = this.props;

    const tempData = new Array( 16 );
    for ( let i = 0; i < tempData.length; i += 1 ) {
      tempData[i] = i + 1;
    }

    console.log( tileSize );

    return (
      <PixelEditor
        data={ tempData }
        dataWidth={ 4 }
        dataHeight={ 4 }
        palette={ palette }
        selectedPaletteIndex={ 3 }
        onDataChange={ newData => this.handleDataChange( newData ) }
        isTileEditor
        tileSize={ tileSize }
      />
    );
  }
}

TilemapPixelEditor.propTypes = {
  palette: PropTypes.array.isRequired,
  tileSize: PropTypes.number.isRequired,
};

function mapStateToProps( state ) {
  return {
    palette: state.palette.colors,
    tileSize: state.project.tileSize,
  };
}

export default connect( mapStateToProps )( TilemapPixelEditor );
