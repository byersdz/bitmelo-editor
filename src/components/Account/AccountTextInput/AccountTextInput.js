
import React from 'react';
import PropTypes from 'prop-types';
import AccountErrorMessage from '../AccountErrorMessage/AccountErrorMessage';

import './AccountTextInput.scss';

const AccountTextInput = props => {
  const {
    title,
    value,
    onValueChange,
    errors,
    isPassword,
  } = props;

  const errorsRender = errors.map( error => {
    return (
      <AccountErrorMessage key={ error.msg }>
        { error.msg }
      </AccountErrorMessage>
    );
  } );

  const type = isPassword ? 'password' : 'text';

  return (
    <div className="account-text-input">
      <div className="top">
        { title }
      </div>
      <div className="bottom">
        <input
          value={ value }
          onChange={ e => onValueChange( e.target.value ) }
          type={ type }
        />
        { errorsRender }
      </div>
    </div>
  );
};

AccountTextInput.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf( PropTypes.object ),
  isPassword: PropTypes.bool,
};

AccountTextInput.defaultProps = {
  errors: [],
  isPassword: false,
};

export default AccountTextInput;
