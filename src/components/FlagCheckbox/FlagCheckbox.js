
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './FlagCheckbox.scss';

const FlagCheckbox = props => {
  const {
    id,
    checked,
    indeterminate,
    onChange,
    color,
    disabled,
    circle,
  } = props;

  const inputId = `${ id }-input`;
  return (
    <div
      id={ id }
      className={ classNames(
        'flag-checkbox',
        { indeterminate },
        color,
        { disabled },
        { circle },
      ) }
    >
      <label className="flag-checkbox-label" htmlFor={ inputId }>
        <input
          type="checkbox"
          checked={ checked }
          id={ inputId }
          onChange={ () => {
            if ( !disabled ) {
              onChange( !checked );
            }
          } }
          disabled={ disabled }
        />
        <span className="checkmark" />
      </label>
    </div>
  );
};

const COLORS = [
  'white',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'pink',
];

FlagCheckbox.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  indeterminate: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  color: PropTypes.oneOf( COLORS ),
  disabled: PropTypes.bool,
  circle: PropTypes.bool,
};

FlagCheckbox.defaultProps = {
  indeterminate: false,
  color: 'blue',
  disabled: false,
  circle: false,
};

export default FlagCheckbox;
