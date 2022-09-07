
import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

import './ToolButton.scss';

class ToolButton extends React.Component {
  render() {
    const {
      icon,
      activeIcon,
      active,
      title,
      onClick,
    } = this.props;

    let buttonIcon = icon;
    if ( activeIcon && active ) {
      buttonIcon = activeIcon;
    }

    return (
      <Button
        className="tool-button"
        title={ title }
        icon={ buttonIcon }
        hideTitle
        click={ onClick }
      />
    );
  }
}

ToolButton.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  activeIcon: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

ToolButton.defaultProps = {
  activeIcon: null,
  active: false,
};

export default ToolButton;
