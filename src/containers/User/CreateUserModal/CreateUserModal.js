
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AccountModal from '../../../components/Account/AccountModal/AccountModal';
import AccountTextInput from '../../../components/Account/AccountTextInput/AccountTextInput';
import Button from '../../../components/Button/Button';
import AccountErrorMessage from '../../../components/Account/AccountErrorMessage/AccountErrorMessage';

import { setCurrentUser } from '../../../state/User/currentUser';

import { createUser } from '../../../api/user';

import './CreateUserModal.scss';

class CreateUserModal extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      userName: '',
      email: '',
      password: '',
      createSuccessful: false,
      errors: [],
    };
  }

  async handleSignUpClick() {
    const { _setCurrentUser } = this.props;
    const { userName, email, password } = this.state;

    const response = await createUser( userName, email, password );

    // if we have errors display them
    if ( response.isError || !response.data ) {
      this.setState( { errors: response.errors } );
    }
    else {
      // if not show a success message and close the modal
      _setCurrentUser( { ...response.data, isLoggedIn: true } );
      this.setState( { createSuccessful: true } );
    }
  }

  render() {
    const { onClose } = this.props;
    const {
      userName,
      email,
      password,
      createSuccessful,
      errors,
    } = this.state;


    const globalErrors = [];
    const userNameErrors = [];
    const emailErrors = [];
    const passwordErrors = [];

    errors.forEach( error => {
      if ( error.param ) {
        if ( error.param === 'userName' ) {
          userNameErrors.push( error );
        }
        else if ( error.param === 'email' ) {
          emailErrors.push( error );
        }
        else if ( error.param === 'password' ) {
          passwordErrors.push( error );
        }
        else {
          globalErrors.push( error );
        }
      }
      else {
        globalErrors.push( error );
      }
    } );

    const errorsRender = globalErrors.map( error => {
      return (
        <AccountErrorMessage key={ error.msg }>
          { error.msg }
        </AccountErrorMessage>
      );
    } );

    const mainRender = createSuccessful ? (
      <div>
        Account creation successful! Welcome to Bitmelo!
      </div>
    ) : (
      <>
        { errorsRender }
        <AccountTextInput
          title="User Name"
          value={ userName }
          onValueChange={ v => this.setState( { userName: v } ) }
          errors={ userNameErrors }
        />
        <AccountTextInput
          title="Email"
          value={ email }
          onValueChange={ v => this.setState( { email: v } ) }
          errors={ emailErrors }
        />
        <AccountTextInput
          title="Password"
          value={ password }
          onValueChange={ v => this.setState( { password: v } ) }
          errors={ passwordErrors }
        />
        <Button
          title="Sign up"
          click={ () => this.handleSignUpClick() }
          account
        />
      </>
    );
    return (
      <AccountModal
        title="Create Bitmelo Account"
        className="create-user-modal"
        onClose={ onClose }
      >
        { mainRender }
      </AccountModal>
    );
  }
}

CreateUserModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  _setCurrentUser: PropTypes.func.isRequired,
};

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setCurrentUser: setCurrentUser,
  }, dispatch );
}

export default connect( null, mapDispatchToProps )( CreateUserModal );
