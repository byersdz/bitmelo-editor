
import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon/Icon';

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
    usePointer,
    rightClick,
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
      onClick={ () => {
        if ( !usePointer ) {
          click();
        }
      } }
      onPointerDown={ e => {
        if ( usePointer ) {
          if ( e.button === 2 ) {
            if ( rightClick ) {
              rightClick();
            }
          }
          else {
            click();
          }
        }
      } }
      onContextMenu={ e => {
        if ( rightClick ) {
          e.preventDefault();
          return false;
        }
        return true;
      } }

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
  style: PropTypes.object,
  standard: PropTypes.bool,
  usePointer: PropTypes.bool,
  rightClick: PropTypes.func,
};

Button.defaultProps = {
  icon: '',
  hideTitle: false,
  className: '',
  style: {},
  standard: false,
  usePointer: false,
  rightClick: null,
};

export default Button;
