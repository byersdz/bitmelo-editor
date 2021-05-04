
import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../../components/Modal/Modal';

import './ImportPaletteModal.scss';

class ImportPaletteModal extends React.Component {
  render() {
    const { onClose } = this.props;

    return (
      <Modal
        className="import-palette-modal"
        title={ 'Import Palette' }
        showHeader
        onClose={ onClose }
      >
        Import Palette Modal
      </Modal>
    );
  }
}

ImportPaletteModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ImportPaletteModal;
