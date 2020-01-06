
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Modal from '../../../../components/Modal/Modal';
import NumberPicker from '../../../../components/NumberPicker/NumberPicker';
import TextInput from '../../../../components/TextInput/TextInput';
import Button from '../../../../components/Button/Button';

import { addTileset } from '../../../../state/Tileset/tilesets';

class AddTilesetModal extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      columns: 8,
      rows: 8,
      name: 'untitled',
    };
  }

  handleAddTileset() {
    const { _addTileset, onClose, tileSize } = this.props;
    const { columns, rows, name } = this.state;

    _addTileset( name, rows, columns, tileSize );
    onClose();
  }

  render() {
    const { onClose, tileSize } = this.props;
    const { columns, rows, name } = this.state;

    const maxDimension = Math.floor( 256 / tileSize );

    return (
      <Modal
        title="Add Tileset"
        onClose={ () => onClose() }
        showHeader
      >
        <div className="modal-controls">
          <TextInput
            title="Name"
            value={ name }
            onValueChange={ v => this.setState( { name: v } ) }
          />
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
