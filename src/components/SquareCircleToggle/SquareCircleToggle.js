
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '../Button/Button';

import './SquareCircleToggle.scss';

const SquareCircleToggle = props => {
  const { value, onChange } = props;

  return (
    <div className="square-circle-toggle">
      <div className={ classNames( ['toggle', 'square', { active: !value }, { inactive: value }] ) }>
        <Button click={ () => onChange( false ) }>
          <div className="toggle-icon" />
        </Button>
      </div>
      <div className={ classNames( ['toggle', 'circle', { active: value }, { inactive: !value }] ) }>
        <Button click={ () => onChange( true ) }>
          <div className="toggle-icon" />
        </Button>
      </div>
    </div>
  );
};

SquareCircleToggle.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SquareCircleToggle;
