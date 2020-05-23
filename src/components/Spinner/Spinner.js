import React from 'react';
import PropTypes from 'prop-types';

import './Spinner.scss';

const Spinner = props => {
  const {
    size,
    borderWidth,
    r,
    g,
    b,
  } = props;

  const containerStyles = {
    width: size,
    height: size,
    boxSizing: 'border-box',
  };

  const transparentColor = `rgba(${ r }, ${ g }, ${ b }, 0.2)`;
  const solidColor = `rgb(${ r }, ${ g }, ${ b })`;

  const spinnerStyles = {
    width: size,
    height: size,
    borderRadius: '50%',
    border: `${ borderWidth } solid white`,
    animation: 'spin 1.2s linear infinite',
    borderTop: `${ borderWidth } solid ${ transparentColor }`,
    borderRight: `${ borderWidth } solid ${ transparentColor }`,
    borderBottom: `${ borderWidth } solid ${ transparentColor }`,
    borderLeft: `${ borderWidth } solid ${ solidColor }`,
    boxSizing: 'border-box',
  };

  return (
    <div className="spinner-container" style={ containerStyles }>
      <div className="spinner" style={ spinnerStyles } />
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.string,
  borderWidth: PropTypes.string,
  r: PropTypes.string,
  g: PropTypes.string,
  b: PropTypes.string,
};

Spinner.defaultProps = {
  size: '32px',
  borderWidth: '4px',
  r: '169',
  g: '118',
  b: '189',
};

export default Spinner;
