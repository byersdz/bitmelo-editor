
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import Button from 'Components/Button/Button';
import Scrollbars from 'Components/Scrollbars/Scrollbars';

import { selectPaletteIndex } from 'State/Palette/selectedIndex';

import './PalettePicker.scss';

class PalettePicker extends React.Component {
  render() {
    const { palette, selectedIndex, _selectPaletteIndex } = this.props;

    const buttonsRender = [];

    for ( let i = 1; i < palette.length; i += 1 ) {
      const color = `#${ palette[i] }`;
      let className = '';
      if ( i === selectedIndex ) {
        className = 'active';
      }

      buttonsRender.push( (
        <Button
          className={ className }
          key={ i }
          title="Palette Button"
          click={ () => _selectPaletteIndex( i ) }
          rightClick={ () => console.log( 'right click' ) }
          hideTitle
          style={ { backgroundColor: color } }
          usePointer
        />
      ) );
    }

    return (
      <div className="palette-picker">
        <Scrollbars>
          <div className="buttons">
            { buttonsRender }
          </div>
        </Scrollbars>
      </div>
    );
  }
}

PalettePicker.propTypes = {
  palette: PropTypes.arrayOf( PropTypes.string ).isRequired,
  selectedIndex: PropTypes.number.isRequired,
  _selectPaletteIndex: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    palette: state.palette.colors,
    selectedIndex: state.palette.selectedIndex,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _selectPaletteIndex: selectPaletteIndex,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( PalettePicker );
