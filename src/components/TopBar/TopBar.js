
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
    leftItems,
    className,
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

  const leftItemsRender = leftItems ? (
    <div className="left-items">
      { leftItems }
    </div>
  ) : null;

  const customClass = `top-bar ${ className }`;
  return (
    <div className={ customClass }>
      { backButtonRender }
      { leftItemsRender }
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
  leftItems: PropTypes.node,
  className: PropTypes.string,
};

TopBar.defaultProps = {
  showBackButton: false,
  onBackClick: null,
  rightItems: null,
  leftItems: null,
  className: '',
};

export default TopBar;
