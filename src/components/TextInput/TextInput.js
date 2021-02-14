
import React from 'react';
import PropTypes from 'prop-types';

import './TextInput.scss';

const TextInput = props => {
  const {
    title,
    value,
    onValueChange,
    hideTitle,
    vertical,
  } = props;

  const titleRender = !hideTitle ? (
    <div className="title">
      { `${ title }:` }
    </div>
  ) : null;

  let className = 'text-input';
  if ( vertical ) {
    className += ' vertical';
  }

  return (
    <div className={ className }>
      { titleRender }
      <div className="controls">
        <input
          className="block-hotkeys"
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
  vertical: PropTypes.bool,
};

TextInput.defaultProps = {
  hideTitle: false,
  vertical: false,
};

export default TextInput;
