import React from 'react';
import { PhotoshopPicker } from 'react-color';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import enhanceWithClickOutside from 'react-click-outside';

import Button from 'Components/Button/Button';

import { setPaletteColor, deletePaletteColor } from 'State/Palette/colors';
import { selectPaletteIndex } from 'State/Palette/selectedIndex';


import './ColorEditor.scss';

class ColorEditor extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      initialColor: props.color,
    };
  }

  handleAccept() {
    const { onClose } = this.props;

    onClose();
  }

  handleCancel() {
    const { onClose, selectedIndex, _setPaletteColor } = this.props;
    const { initialColor } = this.state;

    _setPaletteColor( selectedIndex, initialColor );

    onClose();
  }

  handleColorChange( color ) {
    const { selectedIndex, _setPaletteColor } = this.props;
    _setPaletteColor( selectedIndex, color.hex.slice( 1 ) );
  }

  handleDeleteClicked() {
    const {
      selectedIndex,
      _deletePaletteColor,
      onClose,
      _selectPaletteIndex,
    } = this.props;
    if ( selectedIndex > 0 ) {
      _deletePaletteColor( selectedIndex );
      _selectPaletteIndex( selectedIndex - 1 );
    }

    onClose();
  }

  handleClickOutside() {
    this.handleCancel();
  }

  render() {
    const { color } = this.props;
    return (
      <div className="color-editor">
        <PhotoshopPicker
          header="Edit Palette Color"
          color={ color }
          onAccept={ () => this.handleAccept() }
          onCancel={ () => this.handleCancel() }
          onChange={ c => this.handleColorChange( c ) }
        />
        <Button
          title="Delete Palette Color"
          click={ () => this.handleDeleteClicked() }
          standard
        />
      </div>
    );
  }
}

ColorEditor.propTypes = {
  onClose: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  _setPaletteColor: PropTypes.func.isRequired,
  _deletePaletteColor: PropTypes.func.isRequired,
  _selectPaletteIndex: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  const { selectedIndex } = state.palette;
  const color = state.palette.colors[selectedIndex];
  return {
    selectedIndex,
    color,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setPaletteColor: setPaletteColor,
    _deletePaletteColor: deletePaletteColor,
    _selectPaletteIndex: selectPaletteIndex,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( enhanceWithClickOutside( ColorEditor ) );
