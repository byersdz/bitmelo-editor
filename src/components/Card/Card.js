
import React from 'react';
import PropTypes from 'prop-types';

import './Card.scss';

const Card = ( props ) => {
  const { children } = props;
  return (
    <div className="card">
      { children }
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;
