
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
  } = props;

  const errorsRender = errors.map( error => {
    return (
      <AccountErrorMessage key={ error.msg }>
        { error.msg }
      </AccountErrorMessage>
    );
  } );

  return (
    <div className="account-text-input">
      <div className="top">
        { title }
      </div>
      <div className="bottom">
        <input
          value={ value }
          onChange={ e => onValueChange( e.target.value ) }
          type="text"
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
};

AccountTextInput.defaultProps = {
  errors: [],
};

export default AccountTextInput;
