
import React from 'react';
import PropTypes from 'prop-types';

import Button from 'Components/Button/Button';

import './TopBar.scss';

const TopBar = ( props ) => {
  const { title } = props;
  return (
    <div className="top-bar">
      <span className="title">
        { title }
      </span>
      <Button
        icon="play"
        title="Open Navigation"
        click={ () => console.log( 'left clicked' ) }
        className="right"
        hideTitle
      />
    </div>
  );
};

TopBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TopBar;
