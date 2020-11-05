
import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../../components/Modal/Modal';

class ExportImageModal extends React.Component {
  render() {
    const { onClose } = this.props;
    return (
      <Modal
        title={ 'Export PNG' }
        showHeader
        onClose={ onClose }
      >
        Export Image
      </Modal>
    );
  }
}

ExportImageModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ExportImageModal;
