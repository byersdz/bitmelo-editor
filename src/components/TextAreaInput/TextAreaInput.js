import React from 'react';
import PropTypes from 'prop-types';

import './TextAreaInput.scss';

const TextAreaInput = props => {
  const {
    title,
    hideTitle,
    rows,
    value,
    onChange,
    maxLength,
  } = props;

  const titleRender = !hideTitle ? (
    <div className="title">
      { `${ title }:` }
    </div>
  ) : null;

  const lengthRender = maxLength ? (
    <div className="length-count">
      { `${ value.length } / ${ maxLength }` }
    </div>
  ) : null;


  return (
    <div className="text-area-input">
      { titleRender }
      <textarea
        className="block-hotkeys"
        value={ value }
        rows={ rows }
        onChange={ e => {
          let newValue = e.target.value;

          if ( maxLength && newValue.length > maxLength ) {
            newValue = newValue.slice( 0, maxLength );
          }

          onChange( newValue );
        } }
      />
      { lengthRender }
    </div>
  );
};

TextAreaInput.propTypes = {
  title: PropTypes.string.isRequired,
  hideTitle: PropTypes.bool,
  rows: PropTypes.number,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  maxLength: PropTypes.number,
};

TextAreaInput.defaultProps = {
  hideTitle: false,
  rows: 4,
  maxLength: 0,
};

export default TextAreaInput;
