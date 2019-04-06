
import React from 'react';
import PropTypes from 'prop-types';

import './Card.scss';

const Card = ( props ) => {
  const { children, className } = props;
  const customClass = `card ${ className }`;
  return (
    <div className={ customClass }>
      { children }
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Card.defaultProps = {
  className: '',
};

export default Card;
