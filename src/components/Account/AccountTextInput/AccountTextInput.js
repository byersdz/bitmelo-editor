
import React from 'react';
import PropTypes from 'prop-types';

import './AccountTextInput.scss';

const AccountTextInput = props => {
  const {
    title,
    value,
    onValueChange,
  } = props;

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
      </div>
    </div>
  );
};

AccountTextInput.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export default AccountTextInput;
