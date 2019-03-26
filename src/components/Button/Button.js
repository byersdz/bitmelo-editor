
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
  } = props;

  const iconRender = icon ? (
    <Icon file={ icon } />
  ) : null;

  const titleRender = !hideTitle ? (
    <span className="title">
      { title }
    </span>
  ) : null;

  const customClass = `btn ${ className }`;

  return (
    <button
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
};

Button.defaultProps = {
  icon: '',
  hideTitle: false,
  className: '',
};

export default Button;
