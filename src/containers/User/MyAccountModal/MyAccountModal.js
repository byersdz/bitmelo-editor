import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '../../../components/Button/Button';
import AccountModal from '../../../components/Account/AccountModal/AccountModal';
import AccountTextInput from '../../../components/Account/AccountTextInput/AccountTextInput';

import { deleteUser } from '../../../state/User/currentUser';

import './MyAccountModal.scss';

const PAGES = {};
PAGES.MAIN = 'main';
PAGES.DELETE_ACCOUNT = 'delete-account';
PAGES.CHANGE_PASSWORD = 'change-password';

class MyAccountModal extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      page: PAGES.MAIN,
      password: '',
      oldPassword: '',
      newPassword: '',
      newPassword2: '',
    };
  }

  handleChangePasswordClick() {
    this.setState( { page: PAGES.CHANGE_PASSWORD } );
    console.log( 'reset password' );
  }

  handleDeleteAccountClick() {
    this.setState( { page: PAGES.DELETE_ACCOUNT } );
  }

  handleDeleteUserClick() {
    const { _deleteUser } = this.props;
    const { password } = this.state;

    _deleteUser( password );
  }

  render() {
    const { onClose, currentUser } = this.props;
    const {
      page,
      password,
      oldPassword,
      newPassword,
      newPassword2,
    } = this.state;

    const showBackButton = page !== PAGES.MAIN;

    let mainContent = null;
    let title = '';
    if ( page === PAGES.DELETE_ACCOUNT ) {
      title = 'Delete Account';
      mainContent = (
        <>
          <div className="warning-message">
            Are you sure you want to delete your account? This can not be undone.
          </div>
          <AccountTextInput
            title="Password"
            value={ password }
            onValueChange={ v => this.setState( { password: v } ) }
            isPassword
          />
          <Button
            title="Yes, please delete my account."
            click={ () => this.handleDeleteUserClick() }
            account
            disabled={ password.length === 0 }
          />
          <Button
            title="Cancel"
            click={ () => console.log( 'cancel' ) }
            account
          />
        </>
      );
    }
    else if ( page === PAGES.CHANGE_PASSWORD ) {
      title = 'Change Password';
      mainContent = (
        <>
          <AccountTextInput
            title="Old Password"
            value={ oldPassword }
            onValueChange={ v => this.setState( { oldPassword: v } ) }
            isPassword
          />
          <AccountTextInput
            title="New Password"
            value={ newPassword }
            onValueChange={ v => this.setState( { newPassword: v } ) }
            isPassword
          />
          <AccountTextInput
            title="Retype New Password"
            value={ newPassword2 }
            onValueChange={ v => this.setState( { newPassword2: v } ) }
            isPassword
          />
          <Button
            title="Change Password"
            click={ () => console.log( 'change' ) }
            account
          />
          <Button
            title="Cancel"
            click={ () => console.log( 'cancel' ) }
            account
          />

        </>
      );
    }
    else {
      title = 'My Account';
      mainContent = (
        <>
          <div>
            <div className="property">
              User Name
            </div>
            <div className="value">
              { currentUser.displayName }
            </div>
          </div>
          <div>
            <div className="property">
              Email Address
            </div>
            <div className="value">
              { currentUser.email }
            </div>
          </div>
          <Button
            title="Change Password"
            click={ () => this.handleChangePasswordClick() }
            account
          />
          <Button
            title="Delete Account"
            click={ () => this.handleDeleteAccountClick() }
            account
          />
        </>
      );
    }
    return (
      <AccountModal
        title={ title }
        className="my-account-modal"
        onClose={ onClose }
        showBackButton={ showBackButton }
        onBack={ () => this.setState( { page: PAGES.MAIN } ) }
      >
        { mainContent }
      </AccountModal>
    );
  }
}

MyAccountModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  _deleteUser: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    currentUser: state.user.currentUser,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _deleteUser: deleteUser,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( MyAccountModal );
