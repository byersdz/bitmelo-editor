
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from 'Components/Modal/Modal';
import NumberPicker from 'Components/NumberPicker/NumberPicker';
import Button from 'Components/Button/Button';

import './EditTilemapModal.scss';

class EditTilemapModal extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      tempColumns: props.columns,
      tempRows: props.rows,
    };
  }

  handleClose() {
    const { onClose } = this.props;
    onClose();
  }

  handleSaveClick() {
    this.handleClose();
  }

  render() {
    const { tempColumns, tempRows } = this.state;

    return (
      <Modal
        onClose={ () => this.handleClose() }
        title="Edit Tilemap"
        showHeader
      >
        <div className="modal-controls">
          <NumberPicker
            title="Columns (Width)"
            value={ tempColumns }
            minValue={ 1 }
            maxValue={ 1024 }
            onValueChange={ v => this.setState( { tempColumns: v } ) }
          />
          <NumberPicker
            title="Rows (Height)"
            value={ tempRows }
            minValue={ 1 }
            maxValue={ 1024 }
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

EditTilemapModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  columns: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
};

function mapStateToProps( state ) {
  const { activeIndex } = state.tilemap.present;
  const tilemap = state.tilemap.present.tilemaps[activeIndex];
  return {
    columns: tilemap.width,
    rows: tilemap.height,
  };
}

export default connect( mapStateToProps )( EditTilemapModal );
