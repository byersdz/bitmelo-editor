
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Modal from 'Components/Modal/Modal';
import NumberPicker from 'Components/NumberPicker/NumberPicker';
import Button from 'Components/Button/Button';

import { setTilesetSize } from 'State/Tileset/tilesets';

import './EditTilesetModal.scss';

class EditTilesetModal extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      tempColumns: props.columns,
      tempRows: props.rows,
    };
  }

  handleClose() {
    const { onClose, columns, rows } = this.props;

    this.setState( { tempColumns: columns, tempRows: rows } );
    onClose();
  }

  handleSaveClick() {
    const {
      _setTilesetSize,
      columns,
      rows,
      activeIndex,
      onClose,
      tileSize,
    } = this.props;
    const { tempColumns, tempRows } = this.state;

    if ( tempColumns !== columns || tempRows !== rows ) {
      _setTilesetSize( activeIndex, tileSize, tempColumns, tempRows );
    }

    onClose();
  }

  render() {
    const { tempColumns, tempRows } = this.state;

    return (
      <Modal
        onClose={ () => this.handleClose() }
        title="Edit Tileset"
        showHeader
      >
        <div className="warning">
          Warning! Changing the number of rows or columns will alter your tile IDs!
        </div>
        <div className="modal-controls">
          <NumberPicker
            title="Columns"
            value={ tempColumns }
            minValue={ 1 }
            maxValue={ 128 }
            onValueChange={ v => this.setState( { tempColumns: v } ) }
          />
          <NumberPicker
            title="Rows"
            value={ tempRows }
            minValue={ 1 }
            maxValue={ 128 }
            onValueChange={ v => this.setState( { tempRows: v } ) }
          />
        </div>
        <div className="exit-buttons">
          <Button
            title="Save"
            click={ () => this.handleSaveClick() }
            standard
          />
          <Button
            title="Cancel"
            click={ () => this.handleClose() }
            standard
          />
        </div>
      </Modal>
    );
  }
}

EditTilesetModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  activeIndex: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
  _setTilesetSize: PropTypes.func.isRequired,
  tileSize: PropTypes.number.isRequired,
};

function mapStateToProps( state ) {
  const { activeIndex } = state.tileset.present;
  const tileset = state.tileset.present.tilesets[activeIndex];
  return {
    activeIndex,
    columns: tileset.width,
    rows: tileset.height,
    tileSize: state.project.tileSize,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setTilesetSize: setTilesetSize,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( EditTilesetModal );
