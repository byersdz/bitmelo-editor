
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AccountModal from '../../../components/Account/AccountModal/AccountModal';
import AccountTextInput from '../../../components/Account/AccountTextInput/AccountTextInput';
import Button from '../../../components/Button/Button';
import AButton from '../../../components/AButton/AButton';
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
      isFetching: false,
    };
  }

  async handleSignUpClick() {
    const { _setCurrentUser } = this.props;
    const {
      userName,
      email,
      password,
      isFetching,
    } = this.state;

    if ( isFetching ) {
      return;
    }

    this.setState( { isFetching: true } );
    const response = await createUser( userName, email, password );
    this.setState( { isFetching: false } );

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

  handleKeyDown( event ) {
    if ( event.which === 13 ) {
      this.handleSignUpClick();
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
      isFetching,
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

    let buttonIsDisabled = false;
    if ( !userName || !email || !password || isFetching ) {
      buttonIsDisabled = true;
    }

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
          onKeyDown={ e => this.handleKeyDown( e ) }
        />
        <AccountTextInput
          title="Email"
          value={ email }
          onValueChange={ v => this.setState( { email: v } ) }
          errors={ emailErrors }
          onKeyDown={ e => this.handleKeyDown( e ) }
        />
        <AccountTextInput
          title="Password"
          value={ password }
          onValueChange={ v => this.setState( { password: v } ) }
          errors={ passwordErrors }
          isPassword
          onKeyDown={ e => this.handleKeyDown( e ) }
        />
        <div className="agreement">
          { 'By clicking "Sign up" you agree to our ' }
          <AButton href="https://bitmelo.com/legal/terms-of-service">Terms of Service</AButton>
          { ' and ' }
          <AButton href="https://bitmelo.com/legal/privacy-policy">Privacy Policy</AButton>
        </div>
        <Button
          title="Sign up"
          click={ () => this.handleSignUpClick() }
          account
          disabled={ buttonIsDisabled }
        />
      </>
    );
    return (
      <AccountModal
        title="Create Bitmelo Account"
        className="create-user-modal"
        onClose={ () => {
          if ( !isFetching ) onClose();
        } }
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
