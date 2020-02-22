
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
    account,
    disabled,
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
  else if ( account ) {
    customClass += ' account-btn';
  }

  return (
    <button
      style={ style }
      type="button"
      disabled={ disabled }
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
  disabled: PropTypes.bool,
  standard: PropTypes.bool,
  usePointer: PropTypes.bool,
  rightClick: PropTypes.func,
  account: PropTypes.bool,
};

Button.defaultProps = {
  icon: '',
  hideTitle: false,
  className: '',
  style: {},
  disabled: false,
  standard: false,
  usePointer: false,
  rightClick: null,
  account: false,
};

export default Button;
