
import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

import './ToggleHeader.scss';

const ToggleHeader = props => {
  const { title, onToggle } = props;
  return (
    <div className="toggle-header">
      <div className="title">
        { title }
      </div>
      <Button
        title="Toggle"
        hideTitle
        icon="up"
        click={ onToggle }
      />
    </div>
  );
};

ToggleHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default ToggleHeader;
