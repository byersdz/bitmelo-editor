
import React from 'react';
import PropTypes from 'prop-types';

import './Checkbox.scss';

const Checkbox = props => {
  const { title, checked, onChange } = props;

  return (
    <div className="checkbox">
      <div className="title">
        { `${ title }:` }
      </div>
      <div className="controls">
        <input
          type="checkbox"
          checked={ checked }
          onChange={ e => onChange( e.target.checked ) }
        />
      </div>
    </div>
  );
};

Checkbox.propTypes = {
  title: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
