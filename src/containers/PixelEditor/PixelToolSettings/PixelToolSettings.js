
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
  constructor( props ) {
    super( props );

    this.handleKeyDown = this.handleKeyDown.bind( this );
  }

  componentDidMount() {
    window.addEventListener( 'keydown', this.handleKeyDown );
  }

  componentWillUnmount() {
    window.removeEventListener( 'keydown', this.handleKeyDown );
  }

  handleKeyDown( event ) {
    const { _setPixelToolSettings, pixelToolSettings, selectedTool } = this.props;

    let newPencilSize = -1;
    let newEraserSize = -1;

    if ( event.which === 219 ) { // [
      if ( selectedTool === PENCIL_TOOL ) {
        newPencilSize = pixelToolSettings.pencilSize - 1;
      }
      else if ( selectedTool === ERASER_TOOL ) {
        newEraserSize = pixelToolSettings.eraserSize - 1;
      }
    }
    else if ( event.which === 221 ) { // ]
      if ( selectedTool === PENCIL_TOOL ) {
        newPencilSize = pixelToolSettings.pencilSize + 1;
      }
      else if ( selectedTool === ERASER_TOOL ) {
        newEraserSize = pixelToolSettings.eraserSize + 1;
      }
    }

    if ( newPencilSize > 0 && newPencilSize <= 32 ) {
      _setPixelToolSettings( { ...pixelToolSettings, pencilSize: newPencilSize } );
    }
    else if ( newEraserSize > 0 && newEraserSize <= 32 ) {
      _setPixelToolSettings( { ...pixelToolSettings, eraserSize: newEraserSize } );
    }
  }

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
