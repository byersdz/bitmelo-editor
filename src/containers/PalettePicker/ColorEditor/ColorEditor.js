import React from 'react';
import { PhotoshopPicker } from 'react-color';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import enhanceWithClickOutside from 'react-click-outside';

import Button from 'Components/Button/Button';

import { setPaletteColor } from 'State/Palette/colors';
import { setColorPickerIsOpen } from 'State/Layout/colorPickerIsOpen';

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

  handleClickOutside() {
    const { deleteModalIsOpen } = this.state;

    if ( !deleteModalIsOpen ) {
      this.handleCancel();
    }
  }

  render() {
    const { color, onClose } = this.props;
    const { deleteModalIsOpen } = this.state;

    const deleteModalRender = deleteModalIsOpen ? (
      <DeleteColorModal
        onClose={ () => this.setState( { deleteModalIsOpen: false } ) }
        onDelete={ () => onClose() }
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
        <Button
          title="Delete Palette Color"
          click={ () => this.setState( { deleteModalIsOpen: true } ) }
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
    _setColorPickerIsOpen: setColorPickerIsOpen,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( enhanceWithClickOutside( ColorEditor ) );
