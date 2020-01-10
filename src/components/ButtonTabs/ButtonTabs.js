
import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

const ButtonTabs = ( props ) => {
  const {
    activeButton,
    buttonList,
    hideTitles,
    click,
    className,
    usePointer,
  } = props;

  const customClass = `button-tabs ${ className }`;
  const buttonRender = buttonList.map( ( button ) => {
    const isActive = activeButton === button.key;
    const activeClass = isActive ? 'active' : '';
    return (
      <Button
        key={ button.key }
        title={ button.title }
        icon={ button.icon }
        className={ activeClass }
        hideTitle={ hideTitles }
        click={ () => click( button.key ) }
        usePointer={ usePointer }
      />
    );
  } );

  return (
    <div className={ customClass }>
      { buttonRender }
    </div>
  );
};

ButtonTabs.propTypes = {
  activeButton: PropTypes.string.isRequired,
  buttonList: PropTypes.arrayOf( PropTypes.object ).isRequired,
  hideTitles: PropTypes.bool,
  click: PropTypes.func.isRequired,
  className: PropTypes.string,
  usePointer: PropTypes.bool,
};

ButtonTabs.defaultProps = {
  hideTitles: false,
  className: '',
  usePointer: false,
};

export default ButtonTabs;
