import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../../../components/Button/Button';
import AccountModal from '../../../components/Account/AccountModal/AccountModal';

import './MyAccountModal.scss';

class MyAccountModal extends React.Component {
  handleResetPasswordClick() {
    console.log( 'reset password' );
  }

  handleDeleteAccountClick() {
    console.log( 'delete account' );
  }

  render() {
    const { onClose, currentUser } = this.props;

    return (
      <AccountModal
        title="MyAccount"
        className="my-account-modal"
        onClose={ onClose }
        showBackButton
        onBack={ () => console.log( 'back' ) }
      >
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
          title="Reset Password"
          click={ () => this.handleDeleteAccountClick() }
          account
        />
        <Button
          title="Delete Account"
          click={ () => this.handleDeleteAccountClick() }
          account
        />
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
