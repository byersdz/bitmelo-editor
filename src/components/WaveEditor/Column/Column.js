
import React from 'react';
import PropTypes from 'prop-types';

import Selector from '../Selector/Selector';

import './Column.scss';

const Column = ( props ) => {
  const {
    value,
    minValue,
    maxValue,
    onValueSelected,
  } = props;

  const selectors = [];

  for ( let i = maxValue; i >= minValue; i -= 1 ) {
    const isActive = i === value;
    let isBetween = true;
    if ( i > 0 ) {
      isBetween = i < value;
    }
    else if ( i < 0 ) {
      isBetween = i > value;
    }
    selectors.push( (
      <Selector
        key={ i }
        isActive={ isActive }
        isBetween={ isBetween }
        onSelected={ () => {
          onValueSelected( i );
        } }
      />
    ) );
  }

  return (
    <div className="wave-column">
      { selectors }
    </div>
  );
};

Column.propTypes = {
  onValueSelected: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired, // inclusive
};

export default Column;
