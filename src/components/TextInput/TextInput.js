
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
    maxLength,
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

  const lengthRender = maxLength ? (
    <div className="length-count">
      { `${ value.length } / ${ maxLength }` }
    </div>
  ) : null;

  return (
    <div className={ className }>
      { titleRender }
      <div className="controls">
        <input
          className="block-hotkeys"
          value={ value }
          onChange={ e => {
            let newValue = e.target.value;

            if ( maxLength && newValue.length > maxLength ) {
              newValue = newValue.slice( 0, maxLength );
            }

            onValueChange( newValue );
          } }
          type="text"
        />
      </div>
      { lengthRender }
    </div>
  );
};

TextInput.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  hideTitle: PropTypes.bool,
  vertical: PropTypes.bool,
  maxLength: PropTypes.number,
};

TextInput.defaultProps = {
  hideTitle: false,
  vertical: false,
  maxLength: 0,
};

export default TextInput;
