
import React from 'react';
import PropTypes from 'prop-types';

import './TextInput.scss';

const TextInput = props => {
  const { title } = props;
  return (
    <div className="text-input">
      <div className="title">
        { `${ title }:` }
      </div>
      <div className="controls">
        <input
          type="text"
        />
      </div>
    </div>
  );
};

TextInput.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TextInput;
