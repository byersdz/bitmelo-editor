import React from 'react';
import PropTypes from 'prop-types';

import AccountModal from '../../../components/Account/AccountModal/AccountModal';

class PublishGameModal extends React.Component {
  render() {
    const { onClose } = this.props;

    return (
      <AccountModal
        title="Publish Game"
        className="publish-game-modal"
        onClose={ onClose }
      >
        Publish Game Modal
      </AccountModal>
    );
  }
}

PublishGameModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default PublishGameModal;
