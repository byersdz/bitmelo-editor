
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import ToolPicker from 'Components/ToolPicker/ToolPicker';
import Button from 'Components/Button/Button';

import {
  PENCIL_TOOL,
  ERASER_TOOL,
  BUCKET_TOOL,
  MOVE_TOOL,
  RECT_SELECT_TOOL,
  selectPixelTool,
} from 'State/PixelTools/selectedTool';
import { setTileEditorLayoutSettings } from 'State/Layout/tileEditor';


import './PixelToolPicker.scss';

class PixelToolPicker extends React.Component {
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
    if ( event.which === 66 ) { // b
      this.handleSelectedToolChange( PENCIL_TOOL );
    }
    else if ( event.which === 69 ) { // e
      this.handleSelectedToolChange( ERASER_TOOL );
    }
    else if ( event.which === 71 ) { // g
      this.handleSelectedToolChange( BUCKET_TOOL );
    }
    else if ( event.which === 86 ) { // v
      this.handleSelectedToolChange( MOVE_TOOL );
    }
    else if ( event.which === 77 ) { // m
      this.handleSelectedToolChange( RECT_SELECT_TOOL );
    }
  }

  handleSelectedToolChange( tool ) {
    const { _selectPixelTool } = this.props;
    _selectPixelTool( tool );
  }

  handleShowGridClick() {
    const { _setTileEditorLayoutSettings, tileLayoutSettings } = this.props;
    _setTileEditorLayoutSettings( { ...tileLayoutSettings, showGrid: !tileLayoutSettings.showGrid } );
  }

  render() {
    const { selectedTool, tileLayoutSettings } = this.props;

    const tools = [
      { key: PENCIL_TOOL, title: 'Pencil', icon: 'pencil' },
      { key: ERASER_TOOL, title: 'Eraser', icon: 'eraser' },
      { key: BUCKET_TOOL, title: 'Paint Bucket', icon: 'bucket' },
      { key: MOVE_TOOL, title: 'Move', icon: 'move' },
      { key: RECT_SELECT_TOOL, title: 'Rect Select', icon: 'rect-select' },
    ];

    const showGridClass = tileLayoutSettings.showGrid ? 'active' : '';

    return (
      <ToolPicker
        tools={ tools }
        selectedTool={ selectedTool }
        onSelectedToolChange={ tool => this.handleSelectedToolChange( tool ) }
      >
        <Button
          className={ showGridClass }
          title="Show Grid"
          icon="grid"
          click={ () => this.handleShowGridClick() }
          hideTitle
        />
      </ToolPicker>
    );
  }
}

PixelToolPicker.propTypes = {
  selectedTool: PropTypes.string.isRequired,
  _selectPixelTool: PropTypes.func.isRequired,
  tileLayoutSettings: PropTypes.object.isRequired,
  _setTileEditorLayoutSettings: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    selectedTool: state.pixelTools.selectedTool,
    tileLayoutSettings: state.layout.tileEditor,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _selectPixelTool: selectPixelTool,
    _setTileEditorLayoutSettings: setTileEditorLayoutSettings,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( PixelToolPicker );
