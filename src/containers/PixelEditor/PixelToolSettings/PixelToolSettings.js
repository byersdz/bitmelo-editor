
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ToolSettings from 'Components/ToolSettings/ToolSettings';
import NumberPicker from 'Components/NumberPicker/NumberPicker';

import { PENCIL_TOOL, ERASER_TOOL } from 'State/PixelTools/selectedTool';
import { setPixelToolSettings } from 'State/PixelTools/pixelToolSettings';


import './PixelToolSettings.scss';

class PixelToolSettings extends React.Component {
  handlePencilSizeChange( newValue ) {
    const { _setPixelToolSettings, pixelToolSettings } = this.props;
    _setPixelToolSettings( { ...pixelToolSettings, pencilSize: newValue } );
  }

  handleEraserSizeChange( newValue ) {
    const { _setPixelToolSettings, pixelToolSettings } = this.props;
    _setPixelToolSettings( { ...pixelToolSettings, eraserSize: newValue } );
  }

  render() {
    const { selectedTool, pixelToolSettings } = this.props;

    let toolsRender = null;
    if ( selectedTool === PENCIL_TOOL ) {
      toolsRender = (
        <NumberPicker
          title="Size"
          value={ pixelToolSettings.pencilSize }
          minValue={ 1 }
          maxValue={ 32 }
          onValueChange={ v => this.handlePencilSizeChange( v ) }
        />
      );
    }
    else if ( selectedTool === ERASER_TOOL ) {
      toolsRender = (
        <NumberPicker
          title="Size"
          value={ pixelToolSettings.eraserSize }
          minValue={ 1 }
          maxValue={ 32 }
          onValueChange={ v => this.handleEraserSizeChange( v ) }
        />
      );
    }

    return (
      <ToolSettings>
        { toolsRender }
      </ToolSettings>
    );
  }
}

PixelToolSettings.propTypes = {
  selectedTool: PropTypes.string.isRequired,
  pixelToolSettings: PropTypes.object.isRequired,
  _setPixelToolSettings: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    selectedTool: state.pixelTools.selectedTool,
    pixelToolSettings: state.pixelTools.pixelToolSettings,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setPixelToolSettings: setPixelToolSettings,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( PixelToolSettings );
