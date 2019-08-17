
import React from 'react';
import PropTypes from 'prop-types';

import './AButton.scss';

const AButton = props => {
  const { href, click, children } = props;

  if ( href ) {
    return (
      <a
        className="abutton"
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
      className="abutton"
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
};

AButton.defaultProps = {
  href: '',
  click: null,
  children: null,
};

export default AButton;
