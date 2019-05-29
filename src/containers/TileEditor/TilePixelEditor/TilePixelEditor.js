
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PixelEditor from 'Containers/PixelEditor/PixelEditor';

import './TilePixelEditor.scss';

class TilePixelEditor extends React.Component {
  render() {
    const { palette, selectedPaletteIndex } = this.props;

    const data = new Array( 128 * 64 );

    for ( let i = 0; i < data.length; i += 1 ) {
      data[i] = 2;
    }

    data[1] = 1;
    const dataWidth = 128;
    const dataHeight = 64;

    return (
      <PixelEditor
        data={ data }
        dataWidth={ dataWidth }
        dataHeight={ dataHeight }
        palette={ palette }
        selectedPaletteIndex={ selectedPaletteIndex }
      />
    );
  }
}

TilePixelEditor.propTypes = {
  palette: PropTypes.arrayOf( PropTypes.string ).isRequired,
  selectedPaletteIndex: PropTypes.number.isRequired,
};

function mapStateToProps( state ) {
  return {
    palette: state.palette.colors,
    selectedPaletteIndex: state.palette.selectedIndex,
  };
}

export default connect( mapStateToProps )( TilePixelEditor );
