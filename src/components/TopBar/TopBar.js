
import React from 'react';
import PropTypes from 'prop-types';

import Button from 'Components/Button/Button';

import './TopBar.scss';

const TopBar = ( props ) => {
  const { title, showBackButton, onBackClick } = props;

  const backButtonRender = showBackButton ? (
    <Button
      className="back"
      title="back"
      icon="play"
      hideTitle
      click={ () => onBackClick() }
    />
  ) : null;

  return (
    <div className="top-bar">
      { backButtonRender }
      <span className="title">
        { title }
      </span>
    </div>
  );
};

TopBar.propTypes = {
  title: PropTypes.string.isRequired,
  showBackButton: PropTypes.bool,
  onBackClick: PropTypes.func,
};

TopBar.defaultProps = {
  showBackButton: false,
  onBackClick: null,
};

export default TopBar;
