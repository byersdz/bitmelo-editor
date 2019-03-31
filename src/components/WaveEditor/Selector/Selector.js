
import React from 'react';
import PropTypes from 'prop-types';

import './Selector.scss';

const Selector = ( props ) => {
  const { isActive, isBetween, onSelected } = props;

  let className = 'wave-selector';
  if ( isActive ) {
    className += ' active';
  }
  else if ( isBetween ) {
    className += ' between';
  }

  return (
    <button
      type="button"
      className={ className }
      onMouseDown={ () => onSelected() }
      onMouseEnter={ e => {
        if ( e.buttons === 1 ) {
          onSelected();
        }
      } }
    />
  );
};

Selector.propTypes = {
  isActive: PropTypes.bool,
  isBetween: PropTypes.bool,
  onSelected: PropTypes.func.isRequired,
};

Selector.defaultProps = {
  isActive: false,
  isBetween: false,
};

export default Selector;
