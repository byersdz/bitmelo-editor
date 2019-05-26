
import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'Components/Icon/Icon';

import './Button.scss';

const Button = ( props ) => {
  const {
    title,
    icon,
    hideTitle,
    className,
    click,
    style,
    standard,
  } = props;

  const iconRender = icon ? (
    <Icon file={ icon } />
  ) : null;

  const titleRender = !hideTitle ? (
    <span className="btn-title">
      { title }
    </span>
  ) : null;

  let customClass = `btn ${ className }`;
  if ( standard ) {
    customClass += ' std-btn';
  }

  return (
    <button
      style={ style }
      type="button"
      onClick={ () => click() }
      className={ customClass }
    >
      { iconRender }
      { titleRender }
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  hideTitle: PropTypes.bool,
  className: PropTypes.string,
  click: PropTypes.func.isRequired,
  style: PropTypes.object, // eslint-disable-line
  standard: PropTypes.bool,
};

Button.defaultProps = {
  icon: '',
  hideTitle: false,
  className: '',
  style: {},
  standard: false,
};

export default Button;
