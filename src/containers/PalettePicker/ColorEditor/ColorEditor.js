import React from 'react';
import { PhotoshopPicker } from 'react-color';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import enhanceWithClickOutside from 'react-click-outside';

import Button from '../../../components/Button/Button';

import { setPaletteColor, addPaletteColor } from '../../../state/Palette/colors';
import { selectPaletteIndex } from '../../../state/Palette/selectedIndex';
import { setColorPickerIsOpen } from '../../../state/Layout/colorPickerIsOpen';

import DeleteColorModal from '../DeleteColorModal/DeleteColorModal';

import './ColorEditor.scss';

class ColorEditor extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      initialColor: props.color,
      deleteModalIsOpen: false,
    };
  }

  componentDidMount() {
    const { _setColorPickerIsOpen } = this.props;
    _setColorPickerIsOpen( true );
  }

  componentWillUnmount() {
    const { _setColorPickerIsOpen } = this.props;
    _setColorPickerIsOpen( false );
  }

  handleAccept() {
    const { onClose } = this.props;

    onClose();
  }

  handleCancel( newSelectedIndex = null ) {
    const {
      onClose,
      selectedIndex,
      _setPaletteColor,
      _selectPaletteIndex,
    } = this.props;
    const { initialColor } = this.state;

    _setPaletteColor( selectedIndex, initialColor );

    if ( newSelectedIndex ) {
      // select a new color index before closing
      // used when adding a color
      _selectPaletteIndex( newSelectedIndex );
    }
    onClose();
  }

  handleColorChange( color ) {
    const { selectedIndex, _setPaletteColor } = this.props;
    _setPaletteColor( selectedIndex, color.hex.slice( 1 ) );
  }

  handleClickOutside() {
    const { deleteModalIsOpen } = this.state;

    if ( !deleteModalIsOpen ) {
      this.handleCancel();
    }
  }

  render() {
    const {
      color,
      onClose,
      _addPaletteColor,
      numberOfColors,
    } = this.props;
    const { deleteModalIsOpen } = this.state;

    const deleteModalRender = deleteModalIsOpen ? (
      <DeleteColorModal
        onClose={ () => this.setState( { deleteModalIsOpen: false } ) }
        onDelete={ () => onClose() }
      />
    ) : null;

    const addButtonRender = numberOfColors < 256 ? (
      <Button
        title="Add New Color"
        click={ () => {
          _addPaletteColor( color );
          this.handleCancel( numberOfColors );
        } }
        standard
      />
    ) : null;

    return (
      <div className="color-editor">
        { deleteModalRender }
        <PhotoshopPicker
          header="Edit Palette Color"
          color={ color }
          onAccept={ () => this.handleAccept() }
          onCancel={ () => this.handleCancel() }
          onChange={ c => this.handleColorChange( c ) }
        />
        { addButtonRender }
        <Button
          title="Modify Selected Color"
          click={ () => this.handleAccept() }
          standard
        />
        <Button
          title="Delete Selected Color"
          click={ () => this.setState( { deleteModalIsOpen: true } ) }
          standard
        />
        <Button
          title="Cancel"
          click={ () => this.handleCancel() }
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
  _setColorPickerIsOpen: PropTypes.func.isRequired,
  _addPaletteColor: PropTypes.func.isRequired,
  numberOfColors: PropTypes.number.isRequired,
  _selectPaletteIndex: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  const { selectedIndex } = state.palette;
  const color = state.palette.colors[selectedIndex];
  return {
    selectedIndex,
    color,
    numberOfColors: state.palette.colors.length,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setPaletteColor: setPaletteColor,
    _setColorPickerIsOpen: setColorPickerIsOpen,
    _addPaletteColor: addPaletteColor,
    _selectPaletteIndex: selectPaletteIndex,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( enhanceWithClickOutside( ColorEditor ) );
