import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '../../../components/Button/Button';
import AccountModal from '../../../components/Account/AccountModal/AccountModal';
import AccountTextInput from '../../../components/Account/AccountTextInput/AccountTextInput';
import AccountErrorMessage from '../../../components/Account/AccountErrorMessage/AccountErrorMessage';

import { deleteUser, setDeletingErrors } from '../../../state/User/currentUser';

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
    };
  }

  componentDidMount() {
    const { _setDeletingErrors } = this.props;
    _setDeletingErrors( [] );
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

  handleBackClick() {
    const { _setDeletingErrors } = this.props;

    _setDeletingErrors( [] );

    this.setState( {
      page: PAGES.MAIN,
      password: '',
      oldPassword: '',
      newPassword: '',
      newPassword2: '',
    } );
  }

  render() {
    const { onClose, currentUser } = this.props;
    const {
      page,
      password,
      oldPassword,
      newPassword,
      newPassword2,
      deleteAccountWasSuccessful,
    } = this.state;

    const showBackButton = page !== PAGES.MAIN;

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
            disabled={ password.length === 0 }
          />
          <Button
            title="Cancel"
            click={ () => this.handleBackClick() }
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
            click={ () => this.handleBackClick() }
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

    if ( deleteAccountWasSuccessful ) {
      mainContent = (
        <>
          Account deletion successful.
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
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( MyAccountModal );
