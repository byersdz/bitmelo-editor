
import React from 'react';
import PropTypes from 'prop-types';

import './AccountErrorMessage.scss';

const AccountErrorMessage = props => {
  const { children } = props;

  return (
    <div className="account-error-message">
      { children }
    </div>
  );
};

AccountErrorMessage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AccountErrorMessage;
