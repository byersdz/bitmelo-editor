
import React from 'react';
import PropTypes from 'prop-types';

import Button from 'Components/Button/Button';

const ButtonTabs = ( props ) => {
  const {
    activeButton,
    buttonList,
    hideTitles,
    click,
  } = props;

  const buttonRender = buttonList.map( ( button ) => {
    const isActive = activeButton === button.key;
    const className = isActive ? 'active' : '';
    return (
      <Button
        key={ button.key }
        title={ button.title }
        icon={ button.icon }
        className={ className }
        hideTitle={ hideTitles }
        click={ () => click( button.key ) }
      />
    );
  } );

  return (
    <div className="button-tabs">
      { buttonRender }
    </div>
  );
};

ButtonTabs.propTypes = {
  activeButton: PropTypes.string.isRequired,
  buttonList: PropTypes.arrayOf( PropTypes.object ).isRequired,
  hideTitles: PropTypes.bool,
  click: PropTypes.func.isRequired,
};

ButtonTabs.defaultProps = {
  hideTitles: false,
};

export default ButtonTabs;
