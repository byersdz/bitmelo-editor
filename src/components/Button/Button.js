
import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon/Icon';

import './Button.scss';

class Button extends React.Component {
  constructor( props ) {
    super( props );

    this.buttonRef = React.createRef();
  }

  handleClick() {
    const { click } = this.props;
    this.buttonRef.current.blur();
    click();
  }

  render() {
    const {
      title,
      icon,
      hideTitle,
      className,
      style,
      standard,
      usePointer,
      rightClick,
      account,
      disabled,
      children,
    } = this.props;

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
        ref={ this.buttonRef }
        style={ style }
        type="button"
        disabled={ disabled }
        onClick={ () => {
          if ( !usePointer ) {
            this.handleClick();
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
              this.handleClick();
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
        { children }
      </button>
    );
  }
}

Button.propTypes = {
  title: PropTypes.string,
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
  children: PropTypes.node,
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
  children: null,
  title: '',
};

export default Button;
