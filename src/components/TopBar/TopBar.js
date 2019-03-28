
import React from 'react';
import PropTypes from 'prop-types';

import './TopBar.scss';

const TopBar = ( props ) => {
  const { title } = props;
  return (
    <div className="top-bar">
      <span className="title">
        { title }
      </span>
    </div>
  );
};

TopBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TopBar;
