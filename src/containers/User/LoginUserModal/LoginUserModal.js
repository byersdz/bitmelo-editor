
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AccountModal from '../../../components/Account/AccountModal/AccountModal';
import AccountTextInput from '../../../components/Account/AccountTextInput/AccountTextInput';
import Button from '../../../components/Button/Button';
import AccountErrorMessage from '../../../components/Account/AccountErrorMessage/AccountErrorMessage';

import { setCurrentUser } from '../../../state/User/currentUser';

import { loginUser } from '../../../api/user';

import './LoginUserModal.scss';

class LoginUserModal extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      email: '',
      password: '',
      errors: [],
      isFetching: false,
    };
  }

  async handleLoginClick() {
    const { _setCurrentUser, onClose } = this.props;
    const { email, password, isFetching } = this.state;

    if ( isFetching ) {
      return;
    }

    this.setState( { isFetching: true } );
    const response = await loginUser( email, password );
    this.setState( { isFetching: false } );

    if ( response.isError || !response.data ) {
      this.setState( { errors: response.errors } );
    }
    else {
      _setCurrentUser( { ...response.data, isLoggedIn: true } );
      onClose();
    }
  }

  handleKeyDown( event ) {
    if ( event.which === 13 ) {
      this.handleLoginClick();
    }
  }

  render() {
    const { onClose } = this.props;
    const {
      email,
      password,
      errors,
      isFetching,
    } = this.state;

    const globalErrors = [];
    const emailErrors = [];
    const passwordErrors = [];

    errors.forEach( error => {
      if ( error.param ) {
        if ( error.param === 'email' ) {
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
    if ( !email || !password || isFetching ) {
      buttonIsDisabled = true;
    }

    return (
      <AccountModal
        title="Log in"
        className="login-user-modal"
        onClose={ () => {
          if ( !isFetching ) onClose();
        } }
      >
        { errorsRender }
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
          onKeyDown={ e => this.handleKeyDown( e ) }
          isPassword
        />
        <Button
          title="Log in"
          click={ () => this.handleLoginClick() }
          account
          disabled={ buttonIsDisabled }
        />
      </AccountModal>
    );
  }
}

LoginUserModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  _setCurrentUser: PropTypes.func.isRequired,
};

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setCurrentUser: setCurrentUser,
  }, dispatch );
}

export default connect( null, mapDispatchToProps )( LoginUserModal );
