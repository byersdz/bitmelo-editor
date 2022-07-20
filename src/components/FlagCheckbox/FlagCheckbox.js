
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './FlagCheckbox.scss';

const FlagCheckbox = props => {
  const {
    checked,
    indeterminate,
    onChange,
    color,
  } = props;

  console.log( color );
  return (
    <div className={ classNames( 'flag-checkbox', { indeterminate }, color ) }>
      <label className="flag-checkbox-label" htmlFor="fc-input">
        <input
          type="checkbox"
          checked={ checked }
          id="fc-input"
          onChange={ () => onChange( !checked ) }
        />
        <span className="checkmark" />
      </label>
    </div>
  );
};

const COLORS = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'black',
  'white',
];

FlagCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  indeterminate: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  color: PropTypes.oneOf( COLORS ),
};

FlagCheckbox.defaultProps = {
  indeterminate: false,
  color: 'blue',
};

export default FlagCheckbox;
