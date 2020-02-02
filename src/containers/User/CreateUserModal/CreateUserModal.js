
import React from 'react';
import PropTypes from 'prop-types';

import AccountModal from '../../../components/Account/AccountModal/AccountModal';
import AccountTextInput from '../../../components/Account/AccountTextInput/AccountTextInput';

import './CreateUserModal.scss';

class CreateUserModal extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      userName: '',
      email: '',
      password: '',
    };
  }

  render() {
    const { onClose } = this.props;
    const { userName, email, password } = this.state;

    return (
      <AccountModal
        title="Create Bitmelo Account"
        className="create-user-modal"
        onClose={ onClose }
      >
        <AccountTextInput
          title="User Name"
          value={ userName }
          onValueChange={ v => this.setState( { userName: v } ) }
        />
        <AccountTextInput
          title="Email"
          value={ email }
          onValueChange={ v => this.setState( { email: v } ) }
        />
        <AccountTextInput
          title="Password"
          value={ password }
          onValueChange={ v => this.setState( { password: v } ) }
        />

      </AccountModal>
    );
  }
}

CreateUserModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CreateUserModal;
