
import React from 'react';
import PropTypes from 'prop-types';

import './Card.scss';

const Card = ( props ) => {
  const { children, className, title } = props;

  const titleRender = title ? (
    <div className="title">
      {title}
    </div>
  ) : null;

  const customClass = `card ${ className }`;
  return (
    <div className={ customClass }>
      { titleRender }
      { children }
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
};

Card.defaultProps = {
  className: '',
  title: '',
};

export default Card;
