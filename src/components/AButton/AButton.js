
import React from 'react';
import PropTypes from 'prop-types';

import './AButton.scss';

const AButton = props => {
  const { href, click, children } = props;

  if ( href ) {
    return (
      <a
        href={ href }
        target="_blank"
        rel="noreferrer noopener"
      >
        { children }
      </a>
    );
  }

  return (
    <a // eslint-disable-line
      onClick={ e => {
        click();
        e.preventDefault();
      } }
    >
      { children }
    </a>
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
