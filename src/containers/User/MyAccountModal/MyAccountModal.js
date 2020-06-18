import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../../../components/Button/Button';
import AccountModal from '../../../components/Account/AccountModal/AccountModal';

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
    };
  }

  handleChangePasswordClick() {
    this.setState( { page: PAGES.CHANGE_PASSWORD } );
    console.log( 'reset password' );
  }

  handleDeleteAccountClick() {
    this.setState( { page: PAGES.DELETE_ACCOUNT } );
  }

  render() {
    const { onClose, currentUser } = this.props;
    const { page } = this.state;

    const showBackButton = page !== PAGES.MAIN;

    let mainContent = null;
    let title = '';
    if ( page === PAGES.DELETE_ACCOUNT ) {
      title = 'Delete Account';
      mainContent = (
        <>
          <div>
            Are you sure you want to delete your account? This can not be undone.
          </div>
          <Button
            title="Yes, please delete my account."
            click={ () => console.log( 'delete' ) }
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
    else if ( page === PAGES.CHANGE_PASSWORD ) {
      title = 'Change Password';
      mainContent = (
        <>
          Change Password
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
};

function mapStateToProps( state ) {
  return {
    currentUser: state.user.currentUser,
  };
}

export default connect( mapStateToProps )( MyAccountModal );
