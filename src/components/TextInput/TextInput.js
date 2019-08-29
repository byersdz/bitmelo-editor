
import React from 'react';
import PropTypes from 'prop-types';

import './TextInput.scss';

const TextInput = props => {
  const {
    title,
    value,
    onValueChange,
    hideTitle,
  } = props;

  const titleRender = !hideTitle ? (
    <div className="title">
      { `${ title }:` }
    </div>
  ) : null;

  return (
    <div className="text-input">
      { titleRender }
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
  hideTitle: PropTypes.bool,
};

TextInput.defaultProps = {
  hideTitle: false,
};

export default TextInput;
