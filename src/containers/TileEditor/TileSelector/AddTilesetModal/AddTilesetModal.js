
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Modal from '../../../../components/Modal/Modal';
import NumberPicker from '../../../../components/NumberPicker/NumberPicker';
import Button from '../../../../components/Button/Button';

import { addTileset } from '../../../../state/Tileset/tilesets';
import { selectTileset } from '../../../../state/Tileset/activeIndex';

class AddTilesetModal extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      columns: 8,
      rows: 8,
    };
  }

  handleAddTileset() {
    const {
      _addTileset,
      onClose,
      tileSize,
      _selectTileset,
      numberOfTilesets,
      onTilesetWillBeAdded,
    } = this.props;
    const { columns, rows } = this.state;

    onTilesetWillBeAdded();
    _addTileset( rows, columns, tileSize );
    _selectTileset( numberOfTilesets );
    onClose();
  }

  render() {
    const { onClose, tileSize } = this.props;
    const { columns, rows } = this.state;

    const maxDimension = Math.floor( 256 / tileSize );

    return (
      <Modal
        title="Add Tileset"
        onClose={ () => onClose() }
        showHeader
      >
        <div className="modal-controls">
          <NumberPicker
            title="Columns (Width)"
            value={ columns }
            minValue={ 1 }
            maxValue={ maxDimension }
            onValueChange={ v => this.setState( { columns: v } ) }
          />
          <NumberPicker
            title="Rows (Height)"
            value={ rows }
            minValue={ 1 }
            maxValue={ maxDimension }
            onValueChange={ v => this.setState( { rows: v } ) }
          />
        </div>
        <div className="exit-buttons">
          <Button
            title="Add Tileset"
            click={ () => this.handleAddTileset() }
            standard
          />
          <Button
            title="Cancel"
            click={ () => onClose() }
            standard
          />
        </div>

      </Modal>
    );
  }
}

AddTilesetModal.propTypes = {
  onTilesetWillBeAdded: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  tileSize: PropTypes.number.isRequired,
  _addTileset: PropTypes.func.isRequired,
  _selectTileset: PropTypes.func.isRequired,
  numberOfTilesets: PropTypes.number.isRequired,
};

function mapStateToProps( state ) {
  return {
    tileSize: state.project.tileSize,
    numberOfTilesets: state.tileset.present.tilesets.length,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _addTileset: addTileset,
    _selectTileset: selectTileset,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( AddTilesetModal );
