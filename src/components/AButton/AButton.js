
import React from 'react';
import PropTypes from 'prop-types';

import './AButton.scss';

const AButton = props => {
  const {
    href,
    click,
    children,
    className,
  } = props;

  const customClass = `abutton ${ className }`;

  if ( href ) {
    return (
      <a
        className={ customClass }
        href={ href }
        target="_blank"
        rel="noreferrer noopener"
      >
        { children }
      </a>
    );
  }

  return (
    <span // eslint-disable-line
      className={ customClass }
      onClick={ e => {
        click();
        e.preventDefault();
      } }
    >
      { children }
    </span>
  );
};

AButton.propTypes = {
  href: PropTypes.string,
  click: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};

AButton.defaultProps = {
  href: '',
  click: null,
  children: null,
  className: '',
};

export default AButton;
