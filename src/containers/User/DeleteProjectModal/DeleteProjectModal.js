
import React from 'react';
import PropTypes from 'prop-types';

import AccountModal from '../../../components/Account/AccountModal/AccountModal';

class DeleteProjectModal extends React.Component {
  render() {
    const { onClose } = this.props;

    return (
      <AccountModal
        className="delete-project-modal"
        title="Delete Project"
        onClose={ onClose }
        showHeader
      >
        Delete Project Modal
      </AccountModal>
    );
  }
}

DeleteProjectModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default DeleteProjectModal;
