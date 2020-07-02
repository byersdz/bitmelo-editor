import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '../../../components/Button/Button';
import AccountModal from '../../../components/Account/AccountModal/AccountModal';
import AccountTextInput from '../../../components/Account/AccountTextInput/AccountTextInput';
import AccountErrorMessage from '../../../components/Account/AccountErrorMessage/AccountErrorMessage';

import {
  deleteUser,
  setDeletingErrors,
  changeUserPassword,
  setChangingPasswordErrors,
} from '../../../state/User/currentUser';

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
      deleteAccountWasSuccessful: false,
      changePasswordWasSuccessful: false,
    };
  }

  componentDidMount() {
    const { _setDeletingErrors, _setChangingPasswordErrors } = this.props;
    _setDeletingErrors( [] );
    _setChangingPasswordErrors( [] );
  }

  componentDidUpdate( prevProps ) {
    const { currentUser: prevUser } = prevProps;
    const { currentUser } = this.props;

    if (
      !currentUser.isDeleting
      && prevUser.isDeleting
      && currentUser.deletingErrors.length === 0
    ) {
      this.setState( { deleteAccountWasSuccessful: true } );
    }

    if (
      !currentUser.isChangingPassword
      && prevUser.isChangingPassword
      && currentUser.changingPasswordErrors.length === 0
    ) {
      this.setState( { changePasswordWasSuccessful: true } );
    }
  }

  handleChangePasswordClick() {
    this.setState( { page: PAGES.CHANGE_PASSWORD } );
  }

  handleDeleteAccountClick() {
    this.setState( { page: PAGES.DELETE_ACCOUNT } );
  }

  handleDeleteUserClick() {
    const { _deleteUser } = this.props;
    const { password } = this.state;

    _deleteUser( password );
  }

  handleBackClick() {
    const { _setDeletingErrors, _setChangingPasswordErrors } = this.props;

    _setDeletingErrors( [] );
    _setChangingPasswordErrors( [] );

    this.setState( {
      page: PAGES.MAIN,
      password: '',
      oldPassword: '',
      newPassword: '',
      newPassword2: '',
      changePasswordWasSuccessful: false,
    } );
  }

  render() {
    const { onClose, currentUser, _changeUserPassword } = this.props;
    const {
      page,
      password,
      oldPassword,
      newPassword,
      newPassword2,
      deleteAccountWasSuccessful,
      changePasswordWasSuccessful,
    } = this.state;

    const showBackButton = page !== PAGES.MAIN;

    const disableExit = currentUser.isChangingPassword || currentUser.isDeleting;

    let mainContent = null;
    let title = '';

    if ( page === PAGES.DELETE_ACCOUNT ) {
      title = 'Delete Account';
      let errorsRender = null;
      if ( currentUser.deletingErrors.length > 0 ) {
        errorsRender = currentUser.deletingErrors.map( error => {
          return (
            <AccountErrorMessage key={ error.msg }>
              { error.msg }
            </AccountErrorMessage>
          );
        } );
      }
      mainContent = (
        <>
          { errorsRender }
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
            disabled={ password.length === 0 || disableExit }
          />
          <Button
            title="Cancel"
            click={ () => this.handleBackClick() }
            account
            disabled={ disableExit }
          />
        </>
      );
    }
    else if ( page === PAGES.CHANGE_PASSWORD ) {
      title = 'Change Password';
      let changeButtonDisabled = false;
      if ( !oldPassword || !newPassword || !newPassword2 ) {
        changeButtonDisabled = true;
      }

      let errorsRender = null;
      if ( currentUser.changingPasswordErrors.length > 0 ) {
        errorsRender = currentUser.changingPasswordErrors.map( error => {
          return (
            <AccountErrorMessage key={ error.msg }>
              { error.msg }
            </AccountErrorMessage>
          );
        } );
      }

      mainContent = (
        <>
          { errorsRender }
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
            click={ () => _changeUserPassword( oldPassword, newPassword, newPassword2 ) }
            account
            disabled={ changeButtonDisabled || disableExit }
          />
          <Button
            title="Cancel"
            click={ () => this.handleBackClick() }
            account
            disabled={ disableExit }
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

    if ( deleteAccountWasSuccessful ) {
      mainContent = (
        <>
          Account deletion was successful.
        </>
      );
    }
    else if ( changePasswordWasSuccessful ) {
      mainContent = (
        <>
          Password change was successful.
        </>
      );
    }

    return (
      <AccountModal
        title={ title }
        className="my-account-modal"
        onClose={ onClose }
        showBackButton={ showBackButton }
        onBack={ () => this.handleBackClick() }
        disableExit={ disableExit }
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
  _setDeletingErrors: PropTypes.func.isRequired,
  _changeUserPassword: PropTypes.func.isRequired,
  _setChangingPasswordErrors: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    currentUser: state.user.currentUser,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _deleteUser: deleteUser,
    _setDeletingErrors: setDeletingErrors,
    _changeUserPassword: changeUserPassword,
    _setChangingPasswordErrors: setChangingPasswordErrors,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( MyAccountModal );
