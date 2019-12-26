
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Modal from '../../../../components/Modal/Modal';
import NumberPicker from '../../../../components/NumberPicker/NumberPicker';
import Button from '../../../../components/Button/Button';

import { setTilesetSize } from '../../../../state/Tileset/tilesets';

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
    const { tileSize } = this.props;
    const { tempColumns, tempRows } = this.state;

    const maxDimension = Math.floor( 256 / tileSize );

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
            title="Columns (Width)"
            value={ tempColumns }
            minValue={ 1 }
            maxValue={ maxDimension }
            onValueChange={ v => this.setState( { tempColumns: v } ) }
          />
          <NumberPicker
            title="Rows (Height)"
            value={ tempRows }
            minValue={ 1 }
            maxValue={ maxDimension }
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
