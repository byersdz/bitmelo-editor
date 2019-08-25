
import React from 'react';
import PropTypes from 'prop-types';

import ButtonTabs from 'Components/ButtonTabs/ButtonTabs';

import './ToolPicker.scss';

class ToolPicker extends React.Component {
  render() {
    const {
      tools,
      selectedTool,
      onSelectedToolChange,
      children,
    } = this.props;

    return (
      <div className="tool-picker">
        <ButtonTabs
          buttonList={ tools }
          activeButton={ selectedTool }
          click={ onSelectedToolChange }
          hideTitles
          usePointer
        />
        <div className="custom-tools">
          { children }
        </div>
      </div>
    );
  }
}

ToolPicker.propTypes = {
  tools: PropTypes.arrayOf( PropTypes.object ).isRequired,
  selectedTool: PropTypes.string.isRequired,
  onSelectedToolChange: PropTypes.func.isRequired,
  children: PropTypes.node,
};

ToolPicker.defaultProps = {
  children: null,
};

export default ToolPicker;
