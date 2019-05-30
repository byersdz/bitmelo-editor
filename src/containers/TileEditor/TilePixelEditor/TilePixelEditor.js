
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PixelEditor from 'Containers/PixelEditor/PixelEditor';

import './TilePixelEditor.scss';

class TilePixelEditor extends React.Component {
  constructor( props ) {
    super( props );

    const data = new Array( 128 * 64 );
    for ( let i = 0; i < data.length; i += 1 ) {
      data[i] = 2;
    }

    this.state = {
      data,
      dataWidth: 128,
      dataHeight: 64,
    };
  }

  handleDataChange( newData ) {
    this.setState( { data: newData } );
  }

  render() {
    const { data, dataWidth, dataHeight } = this.state;
    const { palette, selectedPaletteIndex } = this.props;

    return (
      <PixelEditor
        data={ data }
        dataWidth={ dataWidth }
        dataHeight={ dataHeight }
        palette={ palette }
        selectedPaletteIndex={ selectedPaletteIndex }
        onDataChange={ newData => this.handleDataChange( newData ) }
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
