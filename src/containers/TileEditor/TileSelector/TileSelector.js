
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import ToggleHeader from '../../../components/ToggleHeader/ToggleHeader';
import Button from '../../../components/Button/Button';
import NumberPicker from '../../../components/NumberPicker/NumberPicker';

import { toggleTileEditorTileSelector } from '../../../state/Layout/tileEditor';
import { toggleTilemapTileSelector } from '../../../state/Layout/tilemapEditor';

import { setTilesetSelection, setTilesetMapSelection } from '../../../state/Tileset/tilesets';
import { selectTileset } from '../../../state/Tileset/activeIndex';

import EditTilesetModal from './EditTilesetModal/EditTilesetModal';
import TileSelectorCanvas from './TileSelectorCanvas/TileSelectorCanvas';
import AddTilesetModal from './AddTilesetModal/AddTilesetModal';
import DeleteTilesetModal from './DeleteTilesetModal/DeleteTilesetModal';

import {
  eventMatchesHotkey,
  MOVE_TILE_SELECTION_LEFT,
  MOVE_TILE_SELECTION_LEFT_TILED,
  MOVE_TILE_SELECTION_RIGHT,
  MOVE_TILE_SELECTION_RIGHT_TILED,
  MOVE_TILE_SELECTION_UP,
  MOVE_TILE_SELECTION_UP_TILED,
  MOVE_TILE_SELECTION_DOWN,
  MOVE_TILE_SELECTION_DOWN_TILED,
} from '../../../utils/hotkeys';

import './TileSelector.scss';

class TileSelector extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      editModalIsOpen: false,
      addModalIsOpen: false,
      deleteModalIsOpen: false,
    };

    this.handleKeyDown = this.handleKeyDown.bind( this );
  }

  componentDidMount() {
    window.addEventListener( 'keydown', this.handleKeyDown );
  }

  componentWillUnmount() {
    window.removeEventListener( 'keydown', this.handleKeyDown );
  }

  handleKeyDown( event ) {
    const { tileset, isInMapEditor } = this.props;

    if ( isInMapEditor ) {
      return;
    }

    const {
      width,
      height,
      selectionWidth,
      selectionHeight,
      selectedTile,
    } = tileset;

    const currentY = Math.floor( selectedTile / width );
    const currentX = selectedTile - currentY * width;

    let newX = currentX;
    let newY = currentY;

    let didMoveSelection = false;

    if ( eventMatchesHotkey( event, MOVE_TILE_SELECTION_LEFT ) ) {
      if ( currentX > 0 ) {
        newX = currentX - 1;
        didMoveSelection = true;
      }
    }
    else if ( eventMatchesHotkey( event, MOVE_TILE_SELECTION_LEFT_TILED ) ) {
      if ( currentX - selectionWidth + 1 > 0 ) {
        newX = currentX - selectionWidth;
        didMoveSelection = true;
      }
    }
    else if ( eventMatchesHotkey( event, MOVE_TILE_SELECTION_RIGHT ) ) {
      if ( currentX + selectionWidth < width ) {
        newX = currentX + 1;
        didMoveSelection = true;
      }
    }
    else if ( eventMatchesHotkey( event, MOVE_TILE_SELECTION_RIGHT_TILED ) ) {
      if ( currentX + selectionWidth * 2 - 1 < width ) {
        newX = currentX + selectionWidth;
        didMoveSelection = true;
      }
    }
    else if ( eventMatchesHotkey( event, MOVE_TILE_SELECTION_UP ) ) {
      if ( currentY + selectionHeight < height ) {
        newY = currentY + 1;
        didMoveSelection = true;
      }
    }
    else if ( eventMatchesHotkey( event, MOVE_TILE_SELECTION_UP_TILED ) ) {
      if ( currentY + selectionHeight * 2 - 1 < height ) {
        newY = currentY + selectionHeight;
        didMoveSelection = true;
      }
    }
    else if ( eventMatchesHotkey( event, MOVE_TILE_SELECTION_DOWN ) ) {
      if ( currentY > 0 ) {
        newY = currentY - 1;
        didMoveSelection = true;
      }
    }
    else if ( eventMatchesHotkey( event, MOVE_TILE_SELECTION_DOWN_TILED ) ) {
      if ( currentY - selectionHeight + 1 > 0 ) {
        newY = currentY - selectionHeight;
        didMoveSelection = true;
      }
    }

    if ( didMoveSelection ) {
      event.preventDefault();

      const newSelectedTile = newY * width + newX;
      this.handleSelectionChange( {
        selectedTile: newSelectedTile,
        selectionWidth,
        selectionHeight,
      } );
    }
  }

  handleSelectionChange( selection ) {
    const {
      activeIndex,
      _setTilesetSelection,
      _setTilesetMapSelection,
      isInMapEditor,
      onSelectionWillChange,
    } = this.props;

    if ( onSelectionWillChange ) {
      onSelectionWillChange();
    }

    if ( isInMapEditor ) {
      _setTilesetMapSelection( selection, activeIndex );
    }
    else {
      _setTilesetSelection( selection, activeIndex );
    }
  }

  render() {
    const {
      isOpen,
      isOpenTilemap,
      _toggleTileSelector,
      _toggleTilemapTileSelector,
      tileset,
      tileSize,
      palette,
      isInMapEditor,
      editorSelection,
      activeIndex,
      numberOfTilesets,
      _selectTileset,
      onTilesetWillChange,
    } = this.props;

    const { editModalIsOpen, addModalIsOpen, deleteModalIsOpen } = this.state;

    let isOpenLocal = isOpen;
    if ( isInMapEditor ) {
      isOpenLocal = isOpenTilemap;
    }

    const className = isOpenLocal ? 'tile-selector open'
      : 'tile-selector closed';

    const contentClass = isOpenLocal ? 'content' : 'content closed';

    const deleteButtonRender = numberOfTilesets > 1 ? (
      <Button
        title="Delete"
        click={ () => this.setState( { deleteModalIsOpen: true } ) }
        standard
      />
    ) : null;

    const addButtonRender = numberOfTilesets < 8 ? (
      <Button
        title="Add Tileset"
        click={ () => this.setState( { addModalIsOpen: true } ) }
        standard
      />
    ) : null;

    const editButtonRender = !isInMapEditor ? (
      <Fragment>
        <Button
          title="Edit Tileset"
          click={ () => this.setState( { editModalIsOpen: true } ) }
          standard
        />
        { deleteButtonRender }
        { addButtonRender }
      </Fragment>
    ) : null;

    const content = (
      <div className={ contentClass }>
        <TileSelectorCanvas
          width={ tileSize * tileset.width }
          height={ tileSize * tileset.height }
          palette={ palette }
          data={ tileset.layers[0].data }
          selectedTile={ isInMapEditor ? tileset.mapSelectedTile : tileset.selectedTile }
          selectionWidth={ isInMapEditor ? tileset.mapSelectionWidth : tileset.selectionWidth }
          selectionHeight={ isInMapEditor ? tileset.mapSelectionHeight : tileset.selectionHeight }
          tileSize={ tileSize }
          onSelectionChange={ s => this.handleSelectionChange( s ) }
          editorSelection={ editorSelection }
        />
        <NumberPicker
          title="Tileset Index"
          value={ activeIndex }
          minValue={ 0 }
          maxValue={ numberOfTilesets - 1 }
          onValueChange={ v => {
            if ( v !== activeIndex ) {
              if ( onTilesetWillChange ) {
                onTilesetWillChange();
              }
              _selectTileset( v );
            }
          } }
        />
        { editButtonRender }
      </div>
    );

    const editModalRender = editModalIsOpen ? (
      <EditTilesetModal
        onClose={ () => this.setState( { editModalIsOpen: false } ) }
      />
    ) : null;

    const deleteModalRender = deleteModalIsOpen ? (
      <DeleteTilesetModal
        onClose={ () => this.setState( { deleteModalIsOpen: false } ) }
      />
    ) : null;

    const addModalRender = addModalIsOpen ? (
      <AddTilesetModal
        onClose={ () => this.setState( { addModalIsOpen: false } ) }
        onTilesetWillBeAdded={ () => onTilesetWillChange() }
      />
    ) : null;

    const toggleFunction = isInMapEditor ? _toggleTilemapTileSelector : _toggleTileSelector;

    return (
      <div className={ className }>
        <ToggleHeader
          title="Tiles"
          onToggle={ toggleFunction }
        />
        { editModalRender }
        { deleteModalRender }
        { addModalRender }
        { content }
      </div>
    );
  }
}

TileSelector.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isOpenTilemap: PropTypes.bool.isRequired,
  _toggleTileSelector: PropTypes.func.isRequired,
  _toggleTilemapTileSelector: PropTypes.func.isRequired,
  tileset: PropTypes.object.isRequired,
  tileSize: PropTypes.number.isRequired,
  palette: PropTypes.array.isRequired,
  activeIndex: PropTypes.number.isRequired,
  _setTilesetSelection: PropTypes.func.isRequired,
  _setTilesetMapSelection: PropTypes.func.isRequired,
  isInMapEditor: PropTypes.bool,
  onSelectionWillChange: PropTypes.func,
  editorSelection: PropTypes.object.isRequired,
  numberOfTilesets: PropTypes.number.isRequired,
  _selectTileset: PropTypes.func.isRequired,
  onTilesetWillChange: PropTypes.func,
};

TileSelector.defaultProps = {
  isInMapEditor: false,
  onSelectionWillChange: null,
  onTilesetWillChange: null,
};

function mapStateToProps( state ) {
  const { tileSize } = state.project;
  const { activeIndex } = state.tileset.present;
  const activeTileset = state.tileset.present.tilesets[activeIndex];
  const numberOfTilesets = state.tileset.present.tilesets.length;

  return {
    isOpen: state.layout.tileEditor.tileSelectorIsOpen,
    isOpenTilemap: state.layout.tilemapEditor.tileSelectorIsOpen,
    palette: state.palette.colors,
    activeIndex,
    tileset: activeTileset,
    tileSize,
    editorSelection: state.tileset.present.editorSelection,
    numberOfTilesets,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _toggleTileSelector: toggleTileEditorTileSelector,
    _setTilesetSelection: setTilesetSelection,
    _setTilesetMapSelection: setTilesetMapSelection,
    _toggleTilemapTileSelector: toggleTilemapTileSelector,
    _selectTileset: selectTileset,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( TileSelector );
