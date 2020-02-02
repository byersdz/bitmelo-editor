
import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

import './TopBar.scss';

const TopBar = ( props ) => {
  const {
    title,
    showBackButton,
    onBackClick,
    rightItems,
  } = props;

  const backButtonRender = showBackButton ? (
    <Button
      className="back"
      title="back"
      icon="back"
      hideTitle
      click={ () => onBackClick() }
    />
  ) : null;

  const rightItemsRender = rightItems ? (
    <div className="right-items">
      { rightItems }
    </div>
  ) : null;

  return (
    <div className="top-bar">
      { backButtonRender }
      <span className="title">
        { title }
      </span>
      { rightItemsRender }
    </div>
  );
};

TopBar.propTypes = {
  title: PropTypes.string.isRequired,
  showBackButton: PropTypes.bool,
  onBackClick: PropTypes.func,
  rightItems: PropTypes.node,
};

TopBar.defaultProps = {
  showBackButton: false,
  onBackClick: null,
  rightItems: null,
};

export default TopBar;
