
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ToggleHeader from 'Components/ToggleHeader/ToggleHeader';
import NumberPicker from 'Components/NumberPicker/NumberPicker';
import TextInput from 'Components/TextInput/TextInput';
import Button from 'Components/Button/Button';

import { toggleTilemapSelector } from 'State/Layout/tilemapEditor';
import { selectTilemap } from 'State/Tilemap/activeIndex';
import { addTilemap, deleteTilemap, setTilemapName } from 'State/Tilemap/tilemaps';

import EditTilemapModal from '../EditTilemapModal/EditTilemapModal';

import './TilemapSelector.scss';

class TilemapSelector extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      editModalIsOpen: false,
    };
  }

  handleDeleteClicked() {
    const { _deleteTilemap, activeIndex, _selectTilemap } = this.props;
    if ( activeIndex > 0 ) {
      _selectTilemap( activeIndex - 1 );
    }
    _deleteTilemap( activeIndex );
  }

  handleAddTilemap() {
    const { _addTilemap, _selectTilemap, tilemaps } = this.props;
    const newIndex = tilemaps.length;
    _addTilemap();
    _selectTilemap( newIndex );
  }

  render() {
    const {
      isOpen,
      _toggleTilemapSelector,
      activeIndex,
      tilemaps,
      _selectTilemap,
      _setTilemapName,
    } = this.props;

    const { editModalIsOpen } = this.state;

    const className = isOpen ? 'tilemap-selector open'
      : 'tilemap-selector closed';

    const contentClass = isOpen ? 'content' : 'content closed';

    const deleteButtonRender = tilemaps.length > 1 ? (
      <Button
        title="Delete"
        click={ () => this.handleDeleteClicked() }
        standard
      />
    ) : null;

    const editModalRender = editModalIsOpen ? (
      <EditTilemapModal
        onClose={ () => this.setState( { editModalIsOpen: false } ) }
      />
    ) : null;

    return (
      <div className={ className }>
        <div className={ contentClass }>
          { editModalRender }
          <NumberPicker
            title="Tilemap Index"
            value={ activeIndex }
            minValue={ 0 }
            maxValue={ tilemaps.length - 1 }
            onValueChange={ v => _selectTilemap( v ) }
          />
          <TextInput
            title="Name"
            value={ tilemaps[activeIndex].name }
            onValueChange={ v => _setTilemapName( activeIndex, v ) }
            hideTitle
          />
          <Button
            title="Edit Size"
            click={ () => this.setState( { editModalIsOpen: true } ) }
            standard
          />
          { deleteButtonRender }
          <Button
            title="Add Tilemap"
            click={ () => this.handleAddTilemap() }
            standard
          />
        </div>
        <ToggleHeader
          title={ `Tilemaps: ${ tilemaps[activeIndex].name }` }
          onToggle={ () => _toggleTilemapSelector() }
        />
      </div>
    );
  }
}

TilemapSelector.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  _toggleTilemapSelector: PropTypes.func.isRequired,
  activeIndex: PropTypes.number.isRequired,
  tilemaps: PropTypes.array.isRequired,
  _addTilemap: PropTypes.func.isRequired,
  _selectTilemap: PropTypes.func.isRequired,
  _deleteTilemap: PropTypes.func.isRequired,
  _setTilemapName: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    activeIndex: state.tilemap.present.activeIndex,
    tilemaps: state.tilemap.present.tilemaps,
    isOpen: state.layout.tilemapEditor.tilemapSelectorIsOpen,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _toggleTilemapSelector: toggleTilemapSelector,
    _addTilemap: addTilemap,
    _selectTilemap: selectTilemap,
    _deleteTilemap: deleteTilemap,
    _setTilemapName: setTilemapName,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( TilemapSelector );
