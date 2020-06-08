
import React from 'react';
import PropTypes from 'prop-types';

import './AccountCheckbox.scss';

const AccountCheckbox = props => {
  const {
    children,
    checked,
    onChange,
    id,
  } = props;

  return (
    <div className="account-checkbox">
      <label htmlFor={ id }>
        <input
          id={ id }
          type="checkbox"
          checked={ checked }
          onChange={ e => onChange( e.target.checked ) }
        />
        <div className="label-content">
          { children }
        </div>
      </label>
    </div>
  );
};

AccountCheckbox.propTypes = {
  children: PropTypes.node.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default AccountCheckbox;
