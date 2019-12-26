
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import Button from '../../components/Button/Button';
import Scrollbars from '../../components/Scrollbars/Scrollbars';

import { selectPaletteIndex } from '../../state/Palette/selectedIndex';
import { selectAltPaletteIndex } from '../../state/Palette/altIndex';
import { addPaletteColor } from '../../state/Palette/colors';

import ColorEditor from './ColorEditor/ColorEditor';

import eraserBG from './eraser-bg.png';

import './PalettePicker.scss';

class PalettePicker extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      colorEditorIsOpen: false,
    };
  }

  handlePaletteSelection( index ) {
    const { _selectPaletteIndex } = this.props;
    const { colorEditorIsOpen } = this.state;

    if ( !colorEditorIsOpen ) {
      _selectPaletteIndex( index );
    }
  }

  handleAltSelection( index ) {
    const { _selectAltPaletteIndex } = this.props;
    _selectAltPaletteIndex( index );
  }

  handleEditClicked() {
    const { selectedIndex } = this.props;
    const { colorEditorIsOpen } = this.state;

    if ( !colorEditorIsOpen && selectedIndex !== 0 ) {
      this.setState( { colorEditorIsOpen: true } );
    }
  }

  handleAddClicked() {
    const { _addPaletteColor } = this.props;
    _addPaletteColor( '888888' );
  }

  render() {
    const { palette, selectedIndex, altIndex } = this.props;
    const { colorEditorIsOpen } = this.state;

    const buttonsRender = [];

    for ( let i = 0; i < palette.length; i += 1 ) {
      const color = `#${ palette[i] }`;
      let className = '';
      if ( i === selectedIndex ) {
        className = 'active';
      }
      if ( i === altIndex ) {
        className += ' alt';
      }

      const style = { backgroundColor: color };
      if ( i === 0 ) {
        style.backgroundImage = `url(${ eraserBG })`;
      }

      buttonsRender.push( (
        <Button
          className={ className }
          key={ i }
          title="Palette Button"
          click={ () => this.handlePaletteSelection( i ) }
          rightClick={ () => this.handleAltSelection( i ) }
          hideTitle
          style={ style }
          usePointer
        />
      ) );
    }

    buttonsRender.push( (
      <Button
        className="add-color-button"
        key={ 1024 }
        title="Add Color"
        hideTitle
        icon="plus"
        click={ () => this.handleAddClicked() }
      />
    ) );

    const colorEditorRender = colorEditorIsOpen ? (
      <ColorEditor onClose={ () => this.setState( { colorEditorIsOpen: false } ) } />
    ) : null;

    const editButtonStyle = { backgroundColor: `#${ palette[selectedIndex] }` };
    if ( selectedIndex === 0 ) {
      editButtonStyle.backgroundImage = `url(${ eraserBG })`;
    }

    return (
      <div className="palette-picker">
        { colorEditorRender }
        <Button
          title="Edit Selected Color"
          hideTitle
          click={ () => this.handleEditClicked() }
          className="edit-button"
          style={ editButtonStyle }
        />
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
  altIndex: PropTypes.number.isRequired,
  _selectPaletteIndex: PropTypes.func.isRequired,
  _addPaletteColor: PropTypes.func.isRequired,
  _selectAltPaletteIndex: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    palette: state.palette.colors,
    selectedIndex: state.palette.selectedIndex,
    altIndex: state.palette.altIndex,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _selectPaletteIndex: selectPaletteIndex,
    _addPaletteColor: addPaletteColor,
    _selectAltPaletteIndex: selectAltPaletteIndex,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( PalettePicker );
