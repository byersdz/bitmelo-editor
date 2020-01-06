
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Modal from '../../../../components/Modal/Modal';
import NumberPicker from '../../../../components/NumberPicker/NumberPicker';
import Button from '../../../../components/Button/Button';

import { addTileset } from '../../../../state/Tileset/tilesets';

class AddTilesetModal extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      columns: 8,
      rows: 8,
    };
  }

  handleAddTileset() {
    const { _addTileset, onClose, tileSize } = this.props;
    const { columns, rows } = this.state;

    _addTileset( rows, columns, tileSize );
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
  onClose: PropTypes.func.isRequired,
  tileSize: PropTypes.number.isRequired,
  _addTileset: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    tileSize: state.project.tileSize,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _addTileset: addTileset,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( AddTilesetModal );
