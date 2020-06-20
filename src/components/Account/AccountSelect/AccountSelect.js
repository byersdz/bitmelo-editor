import React from 'react';
import PropTypes from 'prop-types';

import './AccountSelect.scss';

const AccountSelect = props => {
  const {
    title,
    items,
    value,
    onValueChange,
  } = props;

  const itemsRender = items.map( item => {
    return (
      <option value={ item.value } key={ item.value }>
        { item.display }
      </option>
    );
  } );

  return (
    <div className="account-select">
      <div className="top">
        { title }
      </div>
      <div className="bottom">
        <select value={ value } onChange={ e => onValueChange( e.target.value ) }>
          { itemsRender }
        </select>
      </div>
    </div>
  );
};

AccountSelect.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf( PropTypes.object ).isRequired,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export default AccountSelect;
