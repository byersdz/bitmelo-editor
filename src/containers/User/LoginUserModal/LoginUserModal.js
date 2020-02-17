
import React from 'react';
import PropTypes from 'prop-types';

import AccountModal from '../../../components/Account/AccountModal/AccountModal';
import AccountTextInput from '../../../components/Account/AccountTextInput/AccountTextInput';
import Button from '../../../components/Button/Button';

import './LoginUserModal.scss';

class LoginUserModal extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
    const { onClose } = this.props;
    const { email, password } = this.state;

    return (
      <AccountModal
        title="Log in"
        className="login-user-modal"
        onClose={ onClose }
      >
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
          title="Log in"
          click={ () => console.log( 'log in' ) }
          account
        />
      </AccountModal>
    );
  }
}

LoginUserModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LoginUserModal;
