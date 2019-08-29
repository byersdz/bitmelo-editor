
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Modal from 'Components/Modal/Modal';
import Button from 'Components/Button/Button';

import { deletePaletteColor } from 'State/Palette/colors';
import { selectPaletteIndex } from 'State/Palette/selectedIndex';
import { clearTilesetsHistory } from 'State/Tileset/index';


import './DeleteColorModal.scss';

class DeleteColorModal extends React.Component {
  handleClose() {
    const { onClose } = this.props;

    onClose();
  }

  handleDeleteClick() {
    const {
      selectedIndex,
      _deletePaletteColor,
      _selectPaletteIndex,
      _clearTilesetsHistory,
      onDelete,
    } = this.props;
    if ( selectedIndex > 0 ) {
      _deletePaletteColor( selectedIndex );
      _clearTilesetsHistory();
      _selectPaletteIndex( selectedIndex - 1 );
    }

    onDelete();
  }

  render() {
    return (
      <Modal
        onClose={ () => this.handleClose() }
        title="Delete Palette Color"
        showHeader
      >
        <div className="warning">
          {
            `
            Are you sure you want to delete this palette color? Deleting a palette color can not be undone!
            If deleted, all colors after this one will also have their paletteId's changed.
            `
          }
        </div>
        <div className="modal-controls">
          <Button
            title="Delete Palette Color"
            click={ () => this.handleDeleteClick() }
            standard
          />
        </div>
        <div className="exit-buttons">
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

DeleteColorModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  _deletePaletteColor: PropTypes.func.isRequired,
  _selectPaletteIndex: PropTypes.func.isRequired,
  _clearTilesetsHistory: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  const { selectedIndex } = state.palette;
  return {
    selectedIndex,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _deletePaletteColor: deletePaletteColor,
    _selectPaletteIndex: selectPaletteIndex,
    _clearTilesetsHistory: clearTilesetsHistory,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( DeleteColorModal );
