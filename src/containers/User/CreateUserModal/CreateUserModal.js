
import React from 'react';
import PropTypes from 'prop-types';

import AccountModal from '../../../components/Account/AccountModal/AccountModal';
import AccountTextInput from '../../../components/Account/AccountTextInput/AccountTextInput';
import Button from '../../../components/Button/Button';

import { createUser } from '../../../api/user';

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

  async handleSignUpClick() {
    const { userName, email, password } = this.state;

    const response = await createUser( userName, email, password );

    // if we have errors display them

    // if not show a success message and close the modal
    console.log( response );
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
        <Button
          title="Sign up"
          click={ () => this.handleSignUpClick() }
          account
        />
      </AccountModal>
    );
  }
}

CreateUserModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CreateUserModal;
