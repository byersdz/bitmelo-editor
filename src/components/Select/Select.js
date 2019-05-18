
import React from 'react';
import PropTypes from 'prop-types';

import './Select.scss';

const Select = props => {
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
    <div className="select">
      <div className="title">
        { `${ title }:` }
      </div>
      <div className="controls">
        <select value={ value } onChange={ e => onValueChange( e.target.value ) }>
          { itemsRender }
        </select>
      </div>
    </div>
  );
};

Select.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf( PropTypes.object ).isRequired,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export default Select;
