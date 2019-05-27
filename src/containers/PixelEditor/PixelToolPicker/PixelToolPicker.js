
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ToolPicker from 'Components/ToolPicker/ToolPicker';

import { PENCIL_TOOL, ERASER_TOOL } from 'State/PixelTools/selectedTool';

import './PixelToolPicker.scss';

class PixelToolPicker extends React.Component {
  render() {
    const { selectedTool } = this.props;

    const tools = [
      { key: PENCIL_TOOL, title: 'Pencil', icon: 'play' },
      { key: ERASER_TOOL, title: 'Eraser', icon: 'play' },
    ];

    return (
      <ToolPicker
        tools={ tools }
        selectedTool={ selectedTool }
      />
    );
  }
}

PixelToolPicker.propTypes = {
  selectedTool: PropTypes.string.isRequired,
};

function mapStateToProps( state ) {
  return {
    selectedTool: state.pixelTools.selectedTool,
  };
}

export default connect( mapStateToProps )( PixelToolPicker );
