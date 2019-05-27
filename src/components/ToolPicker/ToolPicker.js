
import React from 'react';
import PropTypes from 'prop-types';

import ButtonTabs from 'Components/ButtonTabs/ButtonTabs';

import './ToolPicker.scss';

class ToolPicker extends React.Component {
  render() {
    const { tools, selectedTool } = this.props;

    return (
      <div className="tool-picker">
        <ButtonTabs
          buttonList={ tools }
          activeButton={ selectedTool }
          click={ () => console.log( 'tool clicked' ) }
          hideTitles
        />
      </div>
    );
  }
}

ToolPicker.propTypes = {
  tools: PropTypes.arrayOf( PropTypes.object ).isRequired,
  selectedTool: PropTypes.string.isRequired,
};

export default ToolPicker;
