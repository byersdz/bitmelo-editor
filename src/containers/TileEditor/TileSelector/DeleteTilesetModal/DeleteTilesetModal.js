import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Modal from '../../../../components/Modal/Modal';
import Button from '../../../../components/Button/Button';

import { deleteTileset } from '../../../../state/Tileset/tilesets';
import { selectTileset } from '../../../../state/Tileset/activeIndex';

class DeleteTilesetModal extends React.Component {
  render() {
    const {
      onClose,
      activeIndex,
      _deleteTileset,
      _selectTileset,
    } = this.props;

    return (
      <Modal
        title="Delete Tileset"
        showHeader
        onClose={ onClose }
      >
        <div className="warning">
          Are you sure you want to delete this tileset? This will change your tile IDs.
        </div>
        <div className="modal-controls">
          <Button
            title="Delete Tileset"
            click={ () => {
              if ( activeIndex > 0 ) {
                _selectTileset( activeIndex - 1 );
              }
              _deleteTileset( activeIndex );
              onClose();
            } }
            standard
          />
          <Button
            title="Cancel"
            click={ onClose }
            standard
          />
        </div>
      </Modal>
    );
  }
}

DeleteTilesetModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  activeIndex: PropTypes.number.isRequired,
  _deleteTileset: PropTypes.func.isRequired,
  _selectTileset: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    activeIndex: state.tileset.present.activeIndex,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _deleteTileset: deleteTileset,
    _selectTileset: selectTileset,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( DeleteTilesetModal );
