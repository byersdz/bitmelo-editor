
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import ToolPicker from 'Components/ToolPicker/ToolPicker';

import {
  PENCIL_TOOL,
  ERASER_TOOL,
  BUCKET_TOOL,
  selectPixelTool,
} from 'State/PixelTools/selectedTool';

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
  }

  handleSelectedToolChange( tool ) {
    const { _selectPixelTool } = this.props;
    _selectPixelTool( tool );
  }

  render() {
    const { selectedTool } = this.props;

    const tools = [
      { key: PENCIL_TOOL, title: 'Pencil', icon: 'pencil' },
      { key: ERASER_TOOL, title: 'Eraser', icon: 'eraser' },
      { key: BUCKET_TOOL, title: 'Paint Bucket', icon: 'play' },
    ];

    return (
      <ToolPicker
        tools={ tools }
        selectedTool={ selectedTool }
        onSelectedToolChange={ tool => this.handleSelectedToolChange( tool ) }
      />
    );
  }
}

PixelToolPicker.propTypes = {
  selectedTool: PropTypes.string.isRequired,
  _selectPixelTool: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    selectedTool: state.pixelTools.selectedTool,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _selectPixelTool: selectPixelTool,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( PixelToolPicker );
