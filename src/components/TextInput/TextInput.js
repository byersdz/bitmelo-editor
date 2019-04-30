
import React from 'react';
import PropTypes from 'prop-types';

import './TextInput.scss';

const TextInput = props => {
  const { title, value, onValueChange } = props;
  return (
    <div className="text-input">
      <div className="title">
        { `${ title }:` }
      </div>
      <div className="controls">
        <input
          value={ value }
          onChange={ e => onValueChange( e.target.value ) }
          type="text"
        />
      </div>
    </div>
  );
};

TextInput.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export default TextInput;
