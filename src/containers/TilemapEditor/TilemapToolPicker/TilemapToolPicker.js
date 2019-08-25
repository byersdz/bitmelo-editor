
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import ToolPicker from 'Components/ToolPicker/ToolPicker';
import Button from 'Components/Button/Button';

import { TILE_DRAW_TOOL, TILE_ERASE_TOOL, selectTileTool } from 'State/PixelTools/selectedTileTool';
import { setTilemapEditorLayoutSettings } from 'State/Layout/tilemapEditor';

import './TilemapToolPicker.scss';

class TilemapToolPicker extends React.Component {
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
      this.handleSelectedToolChange( TILE_DRAW_TOOL );
    }
    else if ( event.which === 69 ) { // e
      this.handleSelectedToolChange( TILE_ERASE_TOOL );
    }
  }

  handleSelectedToolChange( tool ) {
    const { _selectTileTool } = this.props;
    _selectTileTool( tool );
  }

  handleShowGridClick() {
    const { _setTilemapEditorLayoutSettings, layoutSettings } = this.props;
    _setTilemapEditorLayoutSettings( { ...layoutSettings, showGrid: !layoutSettings.showGrid } );
  }

  render() {
    const { selectedTool, layoutSettings } = this.props;

    const tools = [
      { key: TILE_DRAW_TOOL, title: 'Draw', icon: 'pencil' },
      { key: TILE_ERASE_TOOL, title: 'Eraser', icon: 'eraser' },
    ];

    const showGridClass = layoutSettings.showGrid ? 'active' : '';
    return (
      <ToolPicker
        tools={ tools }
        selectedTool={ selectedTool }
        onSelectedToolChange={ tool => this.handleSelectedToolChange( tool ) }
      >
        <Button
          className={ showGridClass }
          title="Show Grid"
          icon="play"
          click={ () => this.handleShowGridClick() }
          hideTitle
        />
      </ToolPicker>
    );
  }
}

TilemapToolPicker.propTypes = {
  selectedTool: PropTypes.string.isRequired,
  _selectTileTool: PropTypes.func.isRequired,
  layoutSettings: PropTypes.object.isRequired,
  _setTilemapEditorLayoutSettings: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    selectedTool: state.pixelTools.selectedTileTool,
    layoutSettings: state.layout.tilemapEditor,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _selectTileTool: selectTileTool,
    _setTilemapEditorLayoutSettings: setTilemapEditorLayoutSettings,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( TilemapToolPicker );
