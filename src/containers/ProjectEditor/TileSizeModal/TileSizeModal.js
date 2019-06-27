
import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'Components/Modal/Modal';

import './TileSizeModal.scss';

class TileSizeModal extends React.Component {
  render() {
    const { isOpen, onClose } = this.props;
    return (
      <Modal
        isOpen={ isOpen }
        className="tile-size-modal"
        showHeader
        title="Edit Tile Size"
        onClose={ onClose }
      >
        <div>
          WARNING! Changing the tile size will delete all existing tile data!
        </div>
      </Modal>
    );
  }
}

TileSizeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TileSizeModal;
