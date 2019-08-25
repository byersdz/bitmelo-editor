
import React from 'react';
import PropTypes from 'prop-types';

import './ToolSettings.scss';

class ToolSettings extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <div className="tool-settings">
        { children }
      </div>
    );
  }
}

ToolSettings.propTypes = {
  children: PropTypes.node,
};

ToolSettings.defaultProps = {
  children: null,
};

export default ToolSettings;
